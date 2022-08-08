import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateAppService } from '../state/state-app.service';
import { NgProgress } from 'ngx-progressbar';
import { finalize } from 'rxjs/operators';
import { OdicOpenService } from '../service/odic/odic-open.service';
import { PaymentService } from '../service/payment.service';
import { AppTokenService } from '../service/security/app-token.service';
export const HR_PAYMENT = new HttpContextToken(() => false)

@Injectable()
export class TokenIntercepterInterceptor implements HttpInterceptor {
  private token :string = ''
  
  constructor(
    private stateApp: StateAppService,
    private OdicOpenService: OdicOpenService,
    private PaymentService: PaymentService,
    public appTokenService : AppTokenService,
    private progress: NgProgress
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(this.OdicOpenService.getAuthorizationHeaderValue());
    if(request.context.get(HR_PAYMENT)) {        
      const customReq = request.clone({
        setHeaders:{
            Authorization:`Bearer ${this.PaymentService.tokenHr}`,
        }
      })
      return next.handle(customReq).pipe(
        finalize(() => this.progress.ref('home-progress').complete())
      );
    }
    console.log(this.appTokenService.getToken())
    // const customReq = request.clone({
      
    //   setHeaders:{
    //       Authorization: request.url.includes('app_tokens') ?  this.OdicOpenService.getAuthorizationHeaderValue() : `Bearer ${this.appTokenService.getToken()}` 
    //   }
    // })
    const customReq = request.clone({
      setHeaders:{
           Authorization: request.url.includes('app_tokens') ?  this.OdicOpenService.getAuthorizationHeaderValue() : `Bearer ${this.appTokenService.getToken()}` 
      }
    })
    this.progress.ref('home-progress').start()
    return next.handle(customReq).pipe(
      finalize(() => this.progress.ref('home-progress').complete())
    );
  }
}
