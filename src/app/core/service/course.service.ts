import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {
  public idProgramsChange$  = new BehaviorSubject(null)
  constructor(public http: HttpClient) 
   { super('/common/faculty_curriculum', http); }
}
