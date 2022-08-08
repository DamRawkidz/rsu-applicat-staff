import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseForm } from 'src/app/core/base/base-form';
import { selectStatuePayload } from 'src/app/core/root-state/status/selector/status.selectors';

import { AppState } from 'src/app/state/app-reducer';


@Component({
  selector: 'app-application-data-form',
  templateUrl: './application-data-form.component.html',
  styleUrls: ['./application-data-form.component.css']
})

export class ApplicationDataFormComponent extends BaseForm implements OnInit {
  status$ = new Observable<any[]>()
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public fb: FormBuilder,
    public location: Location,
    private store: Store<AppState>
  ) {
    super(fb,activeRoute)
    this.status$ = this.store.select(selectStatuePayload)
   }

  ngOnInit(): void {
    
  }

  onBack(){

  }

  saveData(){
    
  }

  createForm(){
    return this.fb.group({
      app_data_id: [null],
      app_data_type_id: [null],
      ref_data_id: [null],
      status_id: [1],
    })
  }

}
