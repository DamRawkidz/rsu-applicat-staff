import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface School {
  id: string;
  school_code: string;
  school_name_th: string;
  school_name_en: string;
  province_code: string;
  province_name_th: string;
  province_name_en: string;
}
@Injectable({
  providedIn: 'root'
})
export class SchoolService extends BaseService {
  public schoolChange$  = new BehaviorSubject(null)
  constructor(
    public http:HttpClient
  ) { 
    super('/common/school',http)
  }

  nexStap(x){
    return x
  }
}
