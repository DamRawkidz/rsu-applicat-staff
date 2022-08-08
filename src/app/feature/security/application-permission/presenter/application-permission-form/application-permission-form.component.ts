
import { Store } from '@ngrx/store';

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';

import { Observable, throwError } from 'rxjs';
import { STATEFORM } from 'src/app/core/enum/state';
import { ApplicationPermissionService } from 'src/app/core/service/security/application-permission.service';
import { selectStatuePayload } from 'src/app/core/root-state/status/selector/status.selectors';
import { AppState } from 'src/app/state/app-reducer';
@Component({
  selector: 'app-application-permission-form',
  templateUrl: './application-permission-form.component.html',
  styleUrls: ['./application-permission-form.component.css']
})
export class ApplicationPermissionFormComponent extends BaseForm implements OnInit {
  status$ = new Observable<any[]>()
  constructor(
    public activeRoute:ActivatedRoute,
		public fb:FormBuilder,
    public router: Router,
    public permissionSV: ApplicationPermissionService,
    public location: Location,
    private store: Store<AppState>
  ) { 
    super(fb,activeRoute)
    this.status$ = this.store.select(selectStatuePayload)
  }

  ngOnInit(): void {
    switch (this.state) {
      case 'add':

      break;
      case 'edit':
          this.permissionSV.get(this.id).pipe(
            tap(x => this.form.patchValue(x))
          ).subscribe()
      break;
    }


  }

  saveData(){
    let req = this.form.getRawValue()
    const save$ = this.state == STATEFORM.ADD ? this.permissionSV.add(req) : this.permissionSV.update(req)
    save$.pipe(
      // tap(res => this.state == STATEFORM.ADD ? this.appSV.swaltAlert() : this.appSV.swaltAlert('อัพเดรต','อัพเดรตสำเร็จแล้ว')),
      catchError(err => {
        // this.appSV.swaltAlertError('ผิดพลาด',err.messafge)
        return throwError(err)
      })
    ).subscribe()
  }



  onBack(){
    this.location.back()
  }

  createForm(){
    return this.baseFormBuilder.group({
      app_permission_id: [null],
      app_permission_code: ['',[Validators.required]],
      app_permission_name_en: ['',[Validators.required]],
      app_permission_name_th: ['',[Validators.required]],
      status_id: [1],
      create_by: [''],
      create_datetime: [null],
      last_update_by: [''],
      last_update_datetime: [null],
    })
  }
}
