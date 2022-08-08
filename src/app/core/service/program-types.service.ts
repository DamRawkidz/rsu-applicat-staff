import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramTypesService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/program_types', http); }
}
