import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base-service';
export interface AppRoleType {
  app_role_type_id: number;
  app_role_type_code: string;
  app_role_type_name_en: string;
  app_role_type_name_th: string;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
  search: string;
}

export interface Role {
  app_role_id: number;
  app_role_code: string;
  app_role_name_en: string;
  app_role_name_th: string;
  app_role_type_id: number;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
  app_user_roles: any[];
  app_securities: any[];
  app_role_type: AppRoleType;
  search: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApplicationRoleService extends BaseService {

  constructor(
    public http: HttpClient
  ) { 
    super('/v1/security/app_roles',http)
  }
}
