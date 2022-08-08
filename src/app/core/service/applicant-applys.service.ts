import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { Course } from './programs.service';
import { BehaviorSubject } from 'rxjs';
export interface ApplicantApply {
  applicant_apply_id: number;
  academic_year_id: number;
  academic_semester_id: number;
  applicant_id: number;
  program_id: number;
  program_schedule_id: number;
  course_schedule_id?: any;
  application_id: number;
  payin_no: number;
  payment_amount: number;
  payment_flag: boolean;
  document_flag: boolean;
  status_id?: any;
  create_by?: any;
  create_date?: any;
  last_update_by?: any;
  last_update_date?: any;
  program_schedule_code: string;
  program_schedule_name_th: string;
  program_schedule_name_en: string;
  first_name_th: string;
  last_name_th: string;
  first_name_en: string;
  middle_name_en: string;
  last_name_en: string;
  email: string;
  mobile: string;
  prefix_code: string;
  prefix_name_th: string;
  prefix_name_en: string;
  course_id: number;
  course_code: string;
  course_name_th: string;
  course_name_en: string;
  program_code: string;
  program_name_th: string;
  program_name_en: string;
  education_type_code: string;
  education_type_name_th: string;
  education_type_name_en: string;
  faculty_code: string;
  faculty_name_th: string;
  faculty_name_en: string;
  major_code: string;
  major_name_th: string;
  major_name_en: string;
  academic_year_code: string;
  academic_year_name_th: string;
  academic_year_name_en: string;
  academic_semester_code: string;
  semester_name_th: string;
  semester_name_en: string;
  personal_id: string;
  application_status_id: number;
  application_status_code: string;
  application_status_name_th: string;
  application_status_name_en: string;
  courses: Course[];
  documents: Document[];
}
@Injectable({
  providedIn: 'root'
})
export class ApplicantApplysService extends BaseService {
  applicant_apply_id: number = 0
  payin_no: number = 0

  applicantApply: ApplicantApply
  applicants
  data
  firstname
  lastname
  email
  phone
  Faculty
  programe
  public idChange$  = new BehaviorSubject(null)
  public ApplicantApplyChange$  = new BehaviorSubject(null)
  public applicantChange$  = new BehaviorSubject(null)
  constructor(public http: HttpClient) 
   { super('/app/applicant_applys', http); }
}
