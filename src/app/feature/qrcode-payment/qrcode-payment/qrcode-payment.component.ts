import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PaymentService } from 'src/app/core/service/payment.service';
import swal from 'sweetalert2'

@Component({
  selector: 'qrcode-payment',
  templateUrl: './qrcode-payment.component.html',
  styleUrls: ['./qrcode-payment.component.scss']
})
export class QrcodePaymentComponent implements OnInit {
  text:string
  imageBase64: string = ''
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private PaymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.PaymentService.qrCodePayment$.pipe(
      tap(x=>console.log(x))
    ).subscribe()

  }
  onPayment(paymentMethod){
    this.text = paymentMethod.message
    this.progressBar.start()
    let fixUrl: string = ''
    if (paymentMethod.payment_method_code == "CREDITCARD") {
      // rsu-app-api.71dev.com/uat
      // rsu-app-api.71dev.com/uat
      // rsuapp.71dev.com
      //  fixUrl = `https://rsu-app-api.71dev.com/uat/api/app/payments/creditcard/${this.information.applicant_apply_id}`
       fixUrl = paymentMethod.api_url
    } else {
       fixUrl = paymentMethod.api_url
    }

    fixUrl = fixUrl.replace('payments','plan_register_payments')
    console.log(fixUrl)
    
    // ${this.applicantApplysSV.applicant_apply_id}
    this.http.get(`${fixUrl}`).pipe(
      tap((res:any) => {
            if (paymentMethod.payment_method_code == "CREDITCARD") {
              let ref1 = document.getElementById('Ref1') as HTMLInputElement
              let amount = document.getElementById('Amount') as HTMLInputElement
              let Channel = document.getElementById('Channel') as HTMLInputElement
              let ref2 = document.getElementById('Ref2') as HTMLInputElement
              ref1.value = res.ref1
              ref2.value = res.ref2
              Channel.value = res.channel
              amount.value = res.amount
              let form:any = document.getElementById('form1')
              form.action = res.baseUrl
              form.submit();  
          }            
            // fullUrl
      }),
      catchError(err => {
        swal.fire({
          icon: 'error',
          text: 'error',
        })
        this.progressBar.complete()
        return throwError(err)
      })
    ).subscribe( (x:any) => {

      if (x.imageURL) {
          let win = window.open(x.imageURL,'_blank')
      }
      if (x.image) {
          let prefix = 'data:image/jpeg;base64,'
          this.imageBase64 =`${prefix}${x.image}`
          swal.fire({
            html:
              `<img style="width: 200px;height: 200px;" src="${this.imageBase64}" alt="">
              <p>${this.text}</p>
              `,
            // <p>${x.message || 'no message'}</p>
            showConfirmButton: false,
          })
      }
      // if (x.fullUrl) {
      //   let win = window.open(x.fullUrl,'_blank')
      // }
      this.cdRef.detectChanges()
      this.progressBar.complete()
  })
  }
}
