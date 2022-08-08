import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPersonalService {
  protected fullUrl:string = 'localhost:8000/Get'
  constructor() { }

  get(){
    return this.fullUrl
}
}
