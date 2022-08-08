import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BaseService } from '../../base/base-service';


export interface Right {
  obj: string;
  perm: string;
  filter: string;
}

export interface UserToken {
  login: string;
  display: string;
  token: string;
  rights: Right[];
}

export interface ExtractUser {
  // งานหลักสูตร|ALL: string;
  user_uid: string;
  login_name: string;
  display_name: string;
  agency_uid: string;
  exp: number;
  iss: string;
  aud: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppTokenService extends BaseService {
  user:any
  constructor(public http: HttpClient) {
    super('/security/app_tokens',http)
  }

  exchangeToken(){
    return this.http.get<UserToken>(`${this.fullUrl}`,{}).pipe(
      tap(x => console.log(x)),
     tap(res => this.user = {...res})
    )
  }

  getDataTokens(){
    return this.http.get(`${this.fullUrl}`)
  }

  getToken() {
    console.log(this.user)
    return this.user?.token
  }

  // decodeToken(): ExtractUser {
  //  const helper = new JwtHelperService();
  //  const decodedToken = helper.decodeToken(this.user?.token);
  // //  console.log(decodedToken)
  //  return decodedToken
  // }
   
}
