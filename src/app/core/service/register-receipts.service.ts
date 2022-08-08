import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterReceiptsService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/register_receipts', http); }
}
