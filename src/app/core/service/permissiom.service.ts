import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class PermissiomService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/app/securities/permission', http)
  }
}
