import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { STATEFORM } from 'src/app/core/enum/state';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicationObjectService } from 'src/app/core/service/security/application-object.service';
import { Permission, ApplicationPermissionService } from 'src/app/core/service/security/application-permission.service';
import { ApplicationRoleService } from 'src/app/core/service/security/application-role.service';


export interface IObject {
  app_object_id: number;
  app_object_code: string;
  app_object_name_en: string;
  app_object_name_th: string;
  parent_app_object_id?: any;
  internal_object_name: string;
  status_id: number;
  create_by: string;
  create_datetime: Date;
  last_update_by: string;
  last_update_datetime: Date;
  app_securities?: any;
  app_objects?: any;
  search?: any;
}

@Component({
  selector: 'app-application-role-form',
  templateUrl: './application-role-form.component.html',
  styleUrls: ['./application-role-form.component.css']
})
export class ApplicationRoleFormComponent extends BaseForm implements OnInit {
  // status = statusData
  permission: Permission[] = []
  object: IObject[] = []
  departments = []
  public get getAppSecuritiesForm(): FormArray {
    return this.form.get('app_securities') as FormArray
  }

  public get getAppData(): FormArray {
    return this.form.get('app_datas') as FormArray
  }
  
  
  constructor(
      public activeRoute: ActivatedRoute,
		  public fb: FormBuilder,
      private roleSV: ApplicationRoleService,
      private location: Location,
      private permissionSV: ApplicationPermissionService,
      private objectSV: ApplicationObjectService,
      private appSV: AppService,
      private cdRef: ChangeDetectorRef,
  ) { 
    super(fb,activeRoute)
  }

  ngOnInit(): void {
    this.permissionSV.getAll<Permission>().pipe(tap(res => this.permission = [...res])).subscribe()
    this.objectSV.getAll<IObject>().pipe(tap(res => this.object = [...res])).subscribe()

    switch (this.state) {
      case STATEFORM.ADD:
        this.getAppSecuritiesForm.push(this._creatForm())
        this.getAppData.push(this.addData())
        
      break;
      case STATEFORM.EDIT:
          this.roleSV.get(this.id).pipe(
            tap(res => this.form.patchValue(res)),
            tap((res: any) => res.app_securities.map(app => this.getAppSecuritiesForm.push(this._creatForm(app)))),
            tap((res: any) => res.app_datas.map(app => this.getAppData.push(this.addData(app)))),
            tap(() => this.cdRef.detectChanges())
          ).subscribe()
      break;          
    }
  }



  onSave(){
  const req = this.form.getRawValue()
  const save$ = this.state == STATEFORM.ADD ? this.roleSV.add(req) : this.roleSV.update(req)
  save$.pipe(
    tap(_ => this.state == STATEFORM.ADD ? this.appSV.swaltAlert('บันทึก','บันทึกเสร็จแล้ว') : this.appSV.swaltAlert('อัพเดรต','อัพเดรตเสร็จแล้ว ')),
    catchError(err => {
      this.appSV.swaltAlertError('ผิดพลาด',err.message)
      return throwError(err)
    })
  ).subscribe()

  }

  onBack(){
    this.location.back()
  }




  private _creatForm(roles?){
    if(!roles) return this.baseForm.group({
      app_role_id: [null],
      app_object_id: [null],
      app_permission_id: [null],
      restrict_user:[null]
    })


    if(roles) return this.baseForm.group({
      app_role_id: [roles.app_role_id],
      app_object_id: [roles.app_object_id],
      app_permission_id: [roles.app_permission_id],
      restrict_user: [roles.restrict_user]
    })
  }

  add(){
    this.getAppSecuritiesForm.push(this._creatForm())
  }

  remove(index) {
    this.getAppSecuritiesForm.removeAt(index)
  }


  addData(data?){
      if(!data) return this.baseFormBuilder.group({
        app_data_id: [null],
        app_role_id: [null],
        app_data_type_id: [null],
        ref_data_id: [null],
        status_id: [1],
        create_by: [null],
        create_datetime: [null],
        last_update_by: [null],
        last_update_datetime: [null]
      })

      if(data) return this.baseFormBuilder.group({
        app_data_id: [data.app_data_id],
        app_role_id: [data.app_role_id],
        app_data_type_id: [data.app_data_type_id],
        ref_data_id: [data.ref_data_id],
        status_id: [data.status_id],
        create_by: [data.create_by],
        create_datetime: [data.create_datetime],
        last_update_by: [data.last_update_by],
        last_update_datetime: [data.last_update_datetime]
      })
  }

  addDataForm(){
    this.getAppData.push(this.addData())
  }

  removeDataForm(index: number){
    this.getAppData.removeAt(index)
  }



  createForm(){
    return this.baseForm.group({
      app_role_id: [null],
      app_role_code: [''],
      app_role_name_en: [''],
      app_role_name_th: [''],
      app_role_type_id: [null],
      restrict_user: [true],
      status_id: [1],
      create_by: null,
      create_datetime: null,
      last_update_by: null,
      last_update_datetime: null,
      app_securities: this.baseForm.array([
        
      ]),
      app_datas: this.baseForm.array([
        
      ]),
    })
  }



  

}
