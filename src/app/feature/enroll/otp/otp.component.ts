import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { Router } from '@angular/router';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { tap, switchMap, retry, timeout, delay, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2'

@Component({
  selector: 'otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponent implements OnInit {
  informationData
  ApplicantData
  payment :number
  constructor(
    public applicantApplyService:ApplicantApplysService,
    public router:Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.applicantApplyService.applicantChange$.pipe(
      // debounceTime(5000),
      // switchMap(text => this.applicantApplyService.getDate(text)),
      // retry(2),
      tap(x => console.log(x)),
      tap((result: any) => this.ApplicantData = result),
      // tap(x=>
      // this.applicantApplyService.getDate(x).subscribe(res=>{
      //   console.log(res)
      //   this.informationData = res
      //   console.log(this.informationData)
      // })
      // ),
    )
    .subscribe(x=>{
      console.log(x)
      
      
    })
    this.applicantApplyService.ApplicantApplyChange$.pipe(
      // debounceTime(5000),
      // switchMap(text => this.applicantApplyService.getDate(text)),
      // retry(2),
      tap(x => console.log(x)),
      tap((result: any) => this.informationData = result),
      // tap(x=>
      // this.applicantApplyService.getDate(x).subscribe(res=>{
      //   console.log(res)
      //   this.informationData = res
      //   console.log(this.informationData)
      // })
      // ),
    )
    .subscribe(x=>{
      console.log(x)
      
      
    })
  }
  onBack(){
    this.router.navigate(['app/enroll'])
  }
  onClick(){
    swal.fire({
      icon: 'success',
      text: 'บันทึกการชำระเงินเรียบร้อยแล้ว',
    })
    this.router.navigate(['app/enroll'])
  }

  paymentPopup(){  
    const dialogRef = this.dialog.open(PaymentPopupComponent, {
      width: '90vw',
      height: '90vh ',
      data: this.informationData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }
}
