import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/base/base-service';

export interface Permission {
  app_permission_id: number;
  app_permission_code: string;
  app_permission_name_en: string;
  app_permission_name_th: string;
  status_id: number;
  create_by: string;
  create_datetime: string;
  last_update_by: string;
  last_update_datetime: string;
  app_securities: Appsecurity[];
}

interface Appsecurity {
  app_role_id: number;
  app_object_id: number;
  app_permission_id: number;
  app_role: Approle;
  app_object: Appobject;
}

interface Appobject {
  app_object_id: number;
  app_object_code: string;
  app_object_name_en: string;
  app_object_name_th: string;
  parent_app_object_id: number;
  internal_object_name: string;
  status_id: number;
  create_by: string;
  create_datetime: string;
  last_update_by: string;
  last_update_datetime: string;
  app_securities: null[];
  app_objects: null[];
}

interface Approle {
  app_role_id: number;
  app_role_code: string;
  app_role_name_en: string;
  app_role_name_th: string;
  status_id: number;
  create_by: string;
  create_datetime: string;
  last_update_by: string;
  last_update_datetime: string;
  app_user_roles: Appuserrole[];
  app_securities: null[];
}

interface Appuserrole {
  app_user_id: number;
  app_role_id: number;
  app_user: Appuser;
}

interface Appuser {
  app_user_id: number;
  login_name: string;
  display_name: string;
  app_user_type_id: number;
  app_user_datas: Appuserdata[];
  app_user_roles: null[];
  app_user_type: Appusertype;
}

interface Appusertype {
  app_user_type_id: number;
  app_user_type_code: string;
  app_user_type_name_en: string;
  app_user_type_name_th: string;
  jwt_claim_name: string;
  is_jwt_claim_array: boolean;
  status_id: number;
  create_by: string;
  create_datetime: string;
  last_update_by: string;
  last_update_datetime: string;
}

interface Appuserdata {
  app_user_id: number;
  app_data_id: number;
  app_data: Appdata;
}

interface Appdata {
  app_data_id: number;
  app_data_type_id: number;
  ref_data_id: number;
  status_id: number;
  create_by: string;
  create_datetime: string;
  last_update_by: string;
  last_update_datetime: string;
  app_user_datas: null[];
}
@Injectable({
  providedIn: 'root'
})
export class ApplicationPermissionService extends BaseService {

  constructor(
    public http: HttpClient
  ) { 
    super('/v1/security/app_permissions',http)
  }
}
