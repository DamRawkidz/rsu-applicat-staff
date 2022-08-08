import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { concatMap, catchError, tap } from 'rxjs/operators';
import { Plans } from './plans.service';

export interface ReponsePlan {
  plan_register_id: number;
  applicant_apply_id: number;
  academic_semester_id: number;
  pay_in_no: string;
  register_date: string;
  is_package: boolean;
  package_amount: number;
  credit_amount: number;
  fee_amount: number;
  scholarship_amount: number;
  loan_amount: number;
  advanced_amount: number;
  total_subject: number;
  total_credit: number;
  payment_amount: number;
  plan_register_subjects: Planregistersubject[];
  plan_register_fees: Planregisterfee[];
}

export interface Planregisterfee {
  plan_register_fee_id: number;
  plan_register_id: number;
  register_fee_id: number;
  amount: number;
}

export interface Planregistersubject {
  plan_register_subject_id: number;
  plan_register_id: number;
  subject_year_id: number;
  lab_study_subject_section_id?: number;
  lecture_credit_amount: number;
  total_lab_amount: number;
  total_lecture_amount: number;
  total_amount: number;
  lecture_study_subject_section_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterPlansService {

  constructor(
    private http: HttpClient
  ) { }


  registerPlans(req: Plans,id: number){
    return this.http.post<ReponsePlan>(`https://rsu-common-api.71dev.com/api/registers/education_plan/${id}`,req).pipe(
      concatMap(res => this.updatePlan(res)),
      catchError(err => throwError('ERROR FROM api/registers/education_plan'))
    )
  }

  private updatePlan(req: ReponsePlan){
    return this.http.put(`https://rsu-app-api.71dev.com/uat/api/app/plan_register`,req).pipe(
      tap(res => console.log('UPDATE PLAN')),
      tap(res => console.log(res)),
      catchError(err => throwError('ERROR FROM /api/app/plan_register'))
    )
  }
}
