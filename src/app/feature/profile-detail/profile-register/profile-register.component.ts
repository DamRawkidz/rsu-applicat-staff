import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { PlansService } from 'src/app/core/service/plans.service';
import { RegisterPlansService } from 'src/app/core/service/register-plans.service';
import swal from 'sweetalert2'
import { PaymentRegisterPlansPopupComponent } from '../payment-register-plans-popup/payment-register-plans-popup.component';
@Component({
  selector: 'profile-register-plan',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss']
})
export class ProfileRegisterComponent implements OnInit {
  plans;
  col2 = ["lab_section", "subject_code", "year_subject_name_th","credit", "lecture_credit_amount", "total_lab_amount", "total_lecture_amount", "total_amount"]
  totalCredits: number = 0
  totalpayment: number = 0
  sum: number  = 0

  req
  user
  is_plan_register_pay_in_no : any = ''

  constructor(
    private activeRoute: ActivatedRoute,
    public applicantApplysSV: ApplicantApplysService,
    private planSV: PlansService,
    private registerPlanSV: RegisterPlansService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {    
    this.activeRoute.params.pipe(
      map(x => x.id),
      switchMap(id => this.applicantApplysSV.get(id)),
      tap((appl:any) => this.user = {...appl}),
      concatMap((res:any) => {
        // let query = `${res.academic_year_code}/${res.academic_semester_name_th}/${res.major_code}`
        let query = `2563/1/${res.major_code}`
        // let query = `2563/1/0501`
        return this.planSV.getPlans(query).pipe(
          tap(x => {
            x.credits.forEach(x => this.totalCredits += x.amount),
            x.education_plan_fees.forEach(x => this.totalpayment += x.amount )
          }),
          tap(() => this.sum = (this.totalCredits))
        )
      }),
      tap(x => this.req = x),
      catchError(err => {
        alert(`ไม่พบวิชาสำหรับลงทะเบียนเรียน`)
        return throwError('')
      }),
      tap(plans => this.plans = plans)
    ).subscribe()    
  }


  registerPlan(){
    this.registerPlanSV.registerPlans(this.req,this.user.applicant_apply_id).pipe(
      tap(x => swal.fire({
        icon: 'success',
        text: 'ลงทะเบียนสำเร็จแล้ว',
      })),
      concatMap((apply:any) => {
        return this.applicantApplysSV.get(this.user.applicant_apply_id).pipe(
          tap((x:any)=>{
            this.is_plan_register_pay_in_no = x.plan_register_pay_in_no
          })
        )
      })
    ).subscribe(x=>{
      console.log(x)
    })
}

  payment(){
    const dialogRef = this.dialog.open(PaymentRegisterPlansPopupComponent, {
      width: '90vw',
      height: '90vh ',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    }); 
  }

}
