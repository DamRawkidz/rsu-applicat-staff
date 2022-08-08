import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpBackend, HttpClient } from '@angular/common/http';

export interface Course {
  course_id: number;
  course_code: string;
  course_name_en: string;
  course_name_th: string;
  program_id: number;
  faculty_id: number;
  major_id: number;
  application_check_flag: boolean;
  interview_exam_flag: boolean;
  interview_exam_price?: any;
  practical_exam_flag?: any;
  practical_exam_price?: any;
  written_exam_flag: boolean;
  written_exam_price?: any;
  status_id?: number;
  create_by?: number;
  create_date?: string;
  last_update_by?: number;
  last_update_date?: string;
  program_code: string;
  program_name_en: string;
  program_name_th: string;
  academic_year_id: number;
  academic_year_code: string;
  academic_year_name_en: string;
  academic_year_name_th: string;
  academic_semester_id: number;
  academic_semester_code: string;
  academic_semester_name_en: string;
  academic_semester_name_th: string;
  education_type_id: number;
  education_type_code: string;
  education_type_name_en: string;
  education_type_name_th: string;
  faculty_code: string;
  faculty_name_en: string;
  faculty_name_th: string;
  major_code: string;
  major_name_en: string;
  major_name_th: string;
  search?: any;
  open?: any;
  schedules: Schedule[];
  documents?: any;
  writtenExams?: any;
  interviewExams?: any;
}
export interface Schedule {
  course_schedule_id: number;
  course_id: number;
  course_schedule_code: string;
  course_schedule_name_en: string;
  course_schedule_name_th: string;
  apply_start_date: string;
  apply_end_date: string;
  written_exam_start_date: string;
  written_exam_end_date: string;
  practical_exam_start_date?: any;
  practical_exam_end_date?: any;
  interview_exam_start_date: string;
  interview_exam_end_date: string;
  enrollment_start_date: string;
  enrollment_end_date: string;
  status_id: number;
  create_by?: any;
  create_date?: any;
  last_update_by?: any;
  last_update_date?: any;
  course_code: string;
  course_name_en: string;
  course_name_th: string;
  program_id: number;
  program_code: string;
  program_name_en: string;
  program_name_th: string;
  academic_year_id: number;
  academic_year_code: string;
  academic_year_name_en: string;
  academic_year_name_th: string;
  academic_semester_id: number;
  academic_semester_code: string;
  academic_semester_name_en: string;
  academic_semester_name_th: string;
  education_type_id: number;
  education_type_code: string;
  education_type_name_en: string;
  education_type_name_th: string;
  maximum_apply_course?: any;
  faculty_id: number;
  faculty_code: string;
  faculty_name_en: string;
  faculty_name_th: string;
  major_id: number;
  major_code: string;
  major_name_en: string;
  major_name_th: string;
  search?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ProgramsService extends BaseService {

  constructor(
    public http: HttpClient,
    public handler :HttpBackend
  ) 
   { 
     super('/app/programs', http); 
     this.http = new HttpClient(handler)
    }

  getPersonalWithOutToken(){
    return this.http.get('http://localhost:8000/Get')
  }
}
