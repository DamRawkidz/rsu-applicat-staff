import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Plans {
  education_plan_id: number;
  curriculum_id: number;
  academic_semester_id: number;
  plan_code: string;
  advisor_code: string;
  description: string;
  remark: string;
  total_subject: number;
  total_credit: number;
  credit_amount: number;
  fee_amount: number;
  total_amount: number;
  quota: number;
  status: string;
  education_type_code: string;
  faculty_code: string;
  major_code: string;
  academic_year_code: string;
  academic_semester_code: string;
  education_plan_subjects: Educationplansubject[];
  education_plan_fees: Educationplanfee[];
  credits: Credit[];
}

export interface Credit {
  name: string;
  amount: number;
}

export interface Educationplanfee {
  education_plan_fee_id: number;
  education_plan_id: number;
  register_fee_id: number;
  fee_name_th: string;
  fee_name_en: string;
  amount: number;
}

export interface Educationplansubject {
  education_plan_subject_id: number;
  education_plan_id: number;
  subject_year_id: number;
  lab_study_subject_section_id?: number;
  lab_section?: string;
  subject_code: string;
  year_subject_name_th: string;
  year_subject_name_en: string;
  credit: number;
  lecture_credit_amount: number;
  total_lab_amount: number;
  total_lecture_amount: number;
  total_amount: number;
  lecture_study_subject_section_id?: number;
  lecture_section?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(
    private http: HttpClient
  ) { }

  getPlans(query: string){    
    return this.http.get<Plans>(`https://rsu-common-api.71dev.com/api/plans/education_plans/${query}`)
  }
}
