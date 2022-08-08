import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

export interface Education {
  id: string;
  name_th: string;
  name_en: string;
  education_type_code: string;
  education_type_name_th: string;
  education_type_name_en: string;
  faculty_code: string;
  faculty_name_th: string;
  faculty_name_en: string;
  major_code: string;
  course_code: string;
  major_name_th: string;
  major_name_en: string;
  program_id: number;
  program_name_th: string;
  program_name_en: string;
  program_schedule_id: number;
  active_flag: boolean;
  course_id: number
  program_course_id: number
}
export interface Fees {
  applicant_apply_fee_id: number;
  applicant_apply_id: number;
  fee_type_id: number;
  amount: number;
  status_id: number;
  create_by: number;
  create_date: string;
  last_update_by: number;
  last_update_date: string;
}
@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/education', http); }
}
