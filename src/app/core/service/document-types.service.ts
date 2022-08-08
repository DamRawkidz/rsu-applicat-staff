import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
export interface DocumentType {
  document_type_id: number;
  document_type_code: string;
  document_type_name_en: string;
  document_type_name_th: string;
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
export class DocumentTypesService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/document_types', http); }
}
