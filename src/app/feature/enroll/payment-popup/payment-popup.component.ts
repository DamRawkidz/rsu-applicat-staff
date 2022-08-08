import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/core/service/payment.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { tap, catchError, switchMap } from 'rxjs/operators';
import swal from 'sweetalert2'
import { throwError } from 'rxjs';
import { HR_PAYMENT } from 'src/app/core/intercepter/token-intercepter.interceptor';

export interface PaymentInfo {
  payment_application_code: string;
  customer_code: string;
  invoice_no: string;
  amount: number;
}
@Component({
  selector: 'payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPopupComponent implements OnInit {
  payment : any  = []
  imageBase64: string = ''
  applicantApply : any
  paymentInfo : PaymentInfo
  
  constructor(
    private http: HttpClient,
    private PaymentService: PaymentService,
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private applicantApplysSV: ApplicantApplysService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.applicantApplysSV.get(this.data.applicant_apply_id).subscribe(x=>{
      this.applicantApply = x
    })
    this.PaymentService.getDatePayment(this.data.applicant_apply_id).pipe(
      tap(res => console.log(res)),
      tap((res:any) => this.paymentInfo = res.payment_info),
      tap(x => this.PaymentService.tokenHr = x?.payment_token),
      // switchMap(() => this.PaymentService.extractTokenHr()),
      // tap(res => this.payment = {...res}),
    ).subscribe((x:any)=>{
      let i = x.payment_methods.findIndex(x=>x.payment_method_code == 'CREDITCARD')
      console.log(i)
      this.payment = x
      this.payment.payment_methods.splice(i,1)
      console.log(this.payment)
    })
  }
  close() {
    this.dialogRef.close('close')
  }
  onPayment(value){
   
    const fixUrl = 'http://rsuapp.71dev.com/api/app/payments/qrcode'
    console.log(value)
    let options = {
      context : new HttpContext().set(HR_PAYMENT,true)
    }
    this.http.post(`${value.api_url}`,this.paymentInfo,options).pipe(
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
//   onClickPaymentByLastPayment(payment: PaymentMethod){
//     swal.queue([{
//       title: `Are you sure to payment with ${payment.payment_method_name} ?`,
//       confirmButtonText: 'Payment',
//       onAfterClose: () => {
//         this.fee = 0
//         this.cdRef
//       },
//       showLoaderOnConfirm: true,      
//       preConfirm: () => {
//         if (this.selectPayment.payment_method_code == 'CREDITCARD') {
//           // return this.submitForm()
//           return this.http.get(`${payment.api_url}`).toPromise().then((x:any) => {
//             let form:any = document.getElementById('form1')
//             let ref1 = document.getElementById('Ref1') as HTMLInputElement
//             let amount = document.getElementById('Amount') as HTMLInputElement
//             let ref2 = document.getElementById('Ref2') as HTMLInputElement
//             ref1.value = x.ref1
//             ref2.value = x.ref2
//             amount.value = x.amount
//             form.action  = x.baseUrl
//             form.submit();
//           }).catch(err => {
//             swal.fire({
//               icon: 'error',
//               title: 'Sorry...',
//               text: err.error.message,
//             })
//           })
//         }

//         return this.http.get(`${payment.api_url}`).toPromise().then( (x:any) => {
//             if (x.imageURL) {
//                 let win = window.open(x.imageURL,'_blank')
//             }
//             if (x.image) {
//                 let prefix = 'data:image/jpeg;base64,'
//                 this.imageBase64 =`${prefix}${x.image}`
//                 swal.fire({
//                   html:
//                     `<img style="width: 200px;height: 200px;" src="${this.imageBase64}" alt="">
//                       <p>${this.selectPayment.message}</p>
//                     `,
//                   showConfirmButton: false,
//                 })
//             }
//             if (x.fullUrl) {
//               let win = window.open(x.fullUrl,'_blank')
//             }
//             this.cdRef.detectChanges()
            
//         }).catch(err => {
//           swal.fire({
//             icon: 'error',
//             title: 'Sorry...',
//             text: err.error.message,
//           })
//         })
//       }
//     }])

//   }

// }
}
