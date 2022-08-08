import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class InterviewResuleProcessService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/app/interview_result/process',http)
   }
}
