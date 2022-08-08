import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base-service';
export interface AppObject {
  app_object_id: number;
  app_object_code: string;
  app_object_name_en: string;
  app_object_name_th: string;
  parent_app_object_id: number;
  internal_object_name: string;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
  app_securities: any[];
  app_objects: any[];
}

export interface AppPermission {
  app_permission_id: number;
  app_permission_code: string;
  app_permission_name_en: string;
  app_permission_name_th: string;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
  app_securities: any[];
}

export interface AppSecurity {
  app_role_id: number;
  app_object_id: number;
  app_permission_id: number;
  restrict_user: boolean;
  app_object: AppObject;
  app_permission: AppPermission;
}

export interface AppData {
  app_data_id: number;
  app_role_id: number;
  app_data_type_id: number;
  ref_data_id: number;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
}

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
}

export interface AppRole {
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
  app_securities: AppSecurity[];
  app_datas: AppData[];
  app_role_type: AppRoleType;
}

export interface AppUserRole {
  app_user_id: number;
  app_role_id: number;
  app_role: AppRole;
}

export interface AppUserType {
  app_user_type_id: number;
  app_user_type_code: string;
  app_user_type_name_en: string;
  app_user_type_name_th: string;
  jwt_claim_name: string;
  is_jwt_claim_array: boolean;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
}

export interface ApplicationUser {
  app_user_id: number;
  login_name: string;
  display_name: string;
  app_user_type_id: number;
  app_user_roles: AppUserRole[];
  app_user_type: AppUserType;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService extends BaseService {

  constructor(
    public http: HttpClient
  ) { 
    super('/v1/security/app_users',http)
  }
}
