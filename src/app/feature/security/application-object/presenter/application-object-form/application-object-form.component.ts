

import { AppState } from 'src/app/state/app-reducer';


import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { STATEFORM } from 'src/app/core/enum/state';
import { Store } from '@ngrx/store';
import { selectStatuePayload } from 'src/app/core/root-state/status/selector/status.selectors';
import { ApplicationObjectService } from 'src/app/core/service/security/application-object.service';

@Component({
  selector: 'app-application-object-form',
  templateUrl: './application-object-form.component.html',
  styleUrls: ['./application-object-form.component.css']
})
export class ApplicationObjectFormComponent extends BaseForm implements OnInit {
  status$ = new Observable<any[]>()
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public fb: FormBuilder,
    private applicationObjectSV: ApplicationObjectService,    
    public location: Location,
    private store: Store<AppState>
  ) {
    super(fb,activeRoute);
    this.status$  = this.store.select(selectStatuePayload)
  
  }

  ngOnInit(): void {
      switch (this.state) {
        case STATEFORM.ADD:
          
          break;
        case STATEFORM.EDIT:

            this.applicationObjectSV.get(this.id).pipe(
              tap(res => this.form.patchValue(res))
            ).subscribe()

        break;
      }
  }

  saveData(){
    const req = this.form.getRawValue()
    const save$ = this.state == STATEFORM.ADD ? this.applicationObjectSV.add(req) : this.applicationObjectSV.update(req)
    save$.pipe(
      // tap(() => this.state == STATEFORM.ADD ? this.appSV.swaltAlert() : this.appSV.swaltAlert('อัพเดรต','อัพเดรตสำเร็จแล้ว ')),
      catchError(err => {
        // this.appSV.swaltAlertError('ผิดพลาด',err.message)
        return throwError(err)
      })
    ).subscribe()
  }

  onBack(){
    this.location.back()
  }


  createForm(){
    return this.baseFormBuilder.group({
      app_object_id: [null],
      app_object_code: [''],
      app_object_name_en: [''],
      app_object_name_th: [''],
      parent_app_object_id: null,
      internal_object_name: [''],
      status_id: [1],
      create_by: [''],
      create_datetime: null,
      last_update_by: null,
      last_update_datetime: null,
    })
  }
}
