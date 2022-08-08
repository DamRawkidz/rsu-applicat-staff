import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
export  interface Address {
  id: string;
  name_th: string,
  name_en: string
  postal_code: string;
  province_code: string;
  province_name_th: string;
  province_name_en: string;
  district_code: string;
  district_name_th: string;
  district_name_en: string;
  sub_district_code: string;
  sub_district_name_th: string;
  sub_district_name_en: string;
}
@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService  {

  constructor(
    public http: HttpClient
  ) { 
    super('/app/addresses',http)
  }
}
