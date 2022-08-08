import { BaseService } from './../base/base-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Result {
  application_status_name_th: string;
  no_of_applications: number;
}

export interface Apply {
  result: Result[];
  id: number;
  exception?: any;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState?: any;
  isFaulted: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class DashbroadService extends BaseService {

  constructor(
    public http: HttpClient
  ) 
  { 
    super('/app/report', http); 
  }

  getReportApply(){
    return this.http.get<Result[]>(`${this.fullUrl}/apply`)
  }

  getReportApplyCourse(){
    return this.http.get<Apply>(`${this.fullUrl}/apply_course`)
  }

  getReportApplyMonth(){
    return this.http.get<Apply>(`${this.fullUrl}/apply_month`)
  }

  getReportApplyProgram(){
    return this.http.get<Apply>(`${this.fullUrl}/apply_program`)
  }

  getReportApplyProgramPercent(){
    return this.http.get<Apply>(`${this.fullUrl}/apply_program_percent`)
  }
  // /api/app/report/apply_program_percent

}
