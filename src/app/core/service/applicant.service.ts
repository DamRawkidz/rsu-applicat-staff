import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
export interface Applicant {
  applicant_id: number;
  sign_in_channel_id: number;
  user_id: string;
  title_id: number;
  gender_id: number;
  first_name_th: string;
  last_name_th: string;
  first_name_en: string;
  middle_name_en: string;
  last_name_en: string;
  date_of_birth: string;
  email: string;
  mobile: string;
  country_id: string;
  country_name: string;
  province_id: number;
  province_name: string;
  district_id: number;
  district_name: string;
  sub_district_id: number;
  sub_district_name: string;
  address1: string;
  address2: string;
  zipcode: string;
  education_level_id: number;
  graduate_year: string;
  graduate_from_id: number;
  graduate_from_name: string;
  major: string;
  gpa: string;
  status_id: number;
  create_by: number;
  create_date: string;
  last_update_by: number;
  last_update_date: string;
  search: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/applicants', http); }
}
