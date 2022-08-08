import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface StateApp {
  name:string
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class StateAppService {
  private initState: StateApp = {
    name:'',
    token:''
  }
  private  stateApp$  = new BehaviorSubject<StateApp>(this.initState)
  constructor() { }
  getValue(): StateApp {
    return this.stateApp$.value
  }
}
