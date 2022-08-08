import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/email_templates', http); }
}
