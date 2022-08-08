import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
export interface Country {
  country_id: number;
  country_code: string;
  country_name_en: string;
  country_name_th: string;
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
export class CountryService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/common/country',http);
  }
}
