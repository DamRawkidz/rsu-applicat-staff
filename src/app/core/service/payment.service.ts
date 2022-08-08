import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserToken } from './security/token.service';
import { HR_PAYMENT } from '../intercepter/token-intercepter.interceptor';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {
  public qrCodePayment$  = new BehaviorSubject(null)
  tokenHr 
  // channel: BroadcastChannel
  channel = new BroadcastChannel('rsu_staff')
  
  constructor(
    public http: HttpClient
  ) {
    super('/app/payments', http)
    // this.channel = new BroadcastChannel('rsu_staff')
  }

  queryPayment<T>(query: string): Observable<T> {
    let options = {
      context : new HttpContext().set(HR_PAYMENT,true)
    }
    return this.http.get<T>(`${this.fullUrl}${query}`,options)
  }
 
  getDatePayment<T>(id: number): Observable<T> {
    let options = {
      context : new HttpContext().set(HR_PAYMENT,true)
    }
    return this.http.get<T>(`${this.fullUrl}${'/'}${id}`,options)
}
  // extractTokenHr(): Observable<UserToken>{    
  //   const req = {
  //    login_attribute: "email",
  //    user_attribute: "user_id",
  //    department_attribute: "department_id"
  //  }
  //   return this.http.post<UserToken>(`${environment.baseUrl}/api/v1/security/token`,req).pipe(
  //    tap(user => console.log(user)),
  //     tap(user => this.tokenHr = user.token)
  //   )
  // }
}
