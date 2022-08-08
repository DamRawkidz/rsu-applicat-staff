import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { PaymentService } from 'src/app/core/service/payment.service';
import { PaymentInfo } from '../../enroll/payment-popup/payment-popup.component';
import swal from 'sweetalert2'
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'payment-qr-code',
  templateUrl: './payment-qr-code.component.html',
  styleUrls: ['./payment-qr-code.component.scss']
})
export class PaymentQrCodeComponent implements OnInit {
  payment : any  = []
  imageBase64: string = ''
  applicantApply : any
  paymentInfo : PaymentInfo
  constructor(
    private paymentSV: PaymentService,
    private applicantApplysSV: ApplicantApplysService,
    private http: HttpClient,
    
  ) { }

  ngOnInit(): void {
    // this.paymentSV.channel = new BroadcastChannel('rsu_staff')
    this.paymentSV.channel.onmessage = (event) => {
      console.log(event)

      console.log(event.data)
     this.imageBase64 = event.data
     swal.fire({
      html:
        `<img style="width: 200px;height: 200px;" src="${this.imageBase64}" alt="">
          
        `,
      showConfirmButton: false,
    })
    }

  
  }
  onPayment(value){
   
    const fixUrl = 'http://rsuapp.71dev.com/api/app/payments/qrcode'
    console.log(value)
    this.http.post(`${value.api_url}`,this.paymentInfo).pipe(
      catchError(err => {
        swal.fire({
          icon: 'error',
          text: 'error',
        })
        // this.progressBar.complete()
        return throwError(err)
      })
    ).subscribe( (x:any) => {
      console.log(x)
      if (x.imageURL) {
          let win = window.open(x.imageURL,'_blank')
      }
      if (x.image) {
          let prefix = 'data:image/jpeg;base64,'
          this.imageBase64 =`${prefix}${x.image}`
          swal.fire({
            html:
              `<img style="width: 200px;height: 200px;" src="${this.imageBase64}" alt="">
                <p>${value.message || 'no message'}</p>
              `,
            showConfirmButton: false,
          })
      }
      // if (x.fullUrl) {
      //   let win = window.open(x.fullUrl,'_blank')
      // }
      // this.cdRef.detectChanges()
      // this.progressBar.complete()
  })
  }

}
