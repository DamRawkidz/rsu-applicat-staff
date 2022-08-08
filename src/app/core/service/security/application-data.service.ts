import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/base/base-service';


@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService extends BaseService {

  constructor(
    public http: HttpClient
  ) { 
    super('/v1/security/app_datas',http)
  }
}
