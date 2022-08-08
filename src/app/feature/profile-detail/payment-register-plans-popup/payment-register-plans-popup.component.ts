import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { NgProgressComponent } from 'ngx-progressbar';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { ApplicantApply, ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { PaymentService } from 'src/app/core/service/payment.service';
import swal from 'sweetalert2'

@Component({
  selector: 'payment-register-plans-popup',
  templateUrl: './payment-register-plans-popup.component.html',
  styleUrls: ['./payment-register-plans-popup.component.scss']
})
export class PaymentRegisterPlansPopupComponent implements OnInit {
  payment$ = new Observable<any>()
  imageBase64: string = ''
  programId: number = 0
  documentFlag: boolean = null
  information: ApplicantApply
  private applicantApply: ApplicantApply 
  text:string


  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  mock:any = {
    allow_payment: true,
    payment_methods: [
      {
        payment_method_code: 'CREDITCARD',
        payment_method_name: 'VISA / MASTER',
        logo_url:'',
        fee: 6.42,
        amount: 300,
        total_amount: 306.42,
        api_url:'',
        message:''
      },
      {
        payment_method_code: 'THAIQR',
        payment_method_name: 'ชำระเงินด้วย QR CODE',
        logo_url:'',
        fee: 6.42,
        amount: 300,
        total_amount: 306.42,
        api_url:'',
        message:''
      }
    ]
  }
  
  constructor(
    private http: HttpClient,
    private paymentSV: PaymentService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PaymentRegisterPlansPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activeRoute: ActivatedRoute,
    private applicantApplysSV: ApplicantApplysService,
    // private _snackbar: MatSnackBar,    
  ) { 
  }

  ngOnInit(): void {
    this.payment$ = this.loadPayment(this.data.applicant_apply_id)
    console.log(this.data)

    // this.paymentSV.channel = new BroadcastChannel('rsu_staff')

    // this.paymentSV.channel.onmessage = (event) => {
    //   console.log(event)
    // }
  }

  private loadPayment(applicant_apply_id: number){
    return this.http.get<any>(`https://rsu-app-api.71dev.com/uat/api/app/plan_register_payments/${applicant_apply_id}`).pipe(      
      map(payment => {
        return {
          ...payment,
          payment_methods: [...payment.payment_methods.filter(payment => payment.payment_method_code == "THAIQR")]
        }
      }),
      tap(res => console.log(res)),
    )
  }

  onPayment(paymentMethod){
    this.paymentSV.qrCodePayment$.next(paymentMethod)
    this.text = paymentMethod.message
    // if (this.documentFlag) {
    //   swal.fire({
    //     icon: 'warning',
    //     text: 'ส่งเอกสารภายหลัง',
    //   })      
    //   return
    // }
    
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
