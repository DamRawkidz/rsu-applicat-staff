import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSecurityService extends BaseService {

  constructor(
    public http: HttpClient
  ) { 
    super('/v1/security/permission',http)
  }
}
