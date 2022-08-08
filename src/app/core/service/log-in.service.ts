import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  public menuChange$  = new BehaviorSubject(null)
  constructor() { }
}
