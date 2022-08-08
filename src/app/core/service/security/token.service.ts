import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../base/base-service';
export interface Right {
  obj: string;
  perm: string;
}

export interface UserToken {
  login: string;
  display: string;
  token: string;
  rights: Right[];
}

@Injectable({
  providedIn: 'root'
})
export class TokenService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super('/v1/security/token',http)
   }


   extractToken(): Observable<UserToken>{
     const req = {
      login_attribute:"email",
      user_attribute:"user_id",
      department_attribute:"department_id"
    }
     return this.http.post<UserToken>(`${this.fullUrl}`,req)
   }
}
