import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ExamScoreService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/app/exam_scores/upload',http)
   }
}
