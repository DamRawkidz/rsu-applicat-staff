import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

export interface District {
  district_id: number;
  district_code: string;
  district_name_en: string;
  district_name_th: string;
  province_id: number;
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
export class DistrictsService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/common/districts',http)
}
}
