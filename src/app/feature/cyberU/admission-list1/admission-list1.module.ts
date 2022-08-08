import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionList1ListComponent } from './admission-list1-list/admission-list1-list.component';
import { AdmissionList1FormComponent } from './admission-list1-form/admission-list1-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAddmissionComponent } from './admission-list1-list/list-addmission/list-addmission.component';
import { ListDocComponent } from './admission-list1-list/list-doc/list-doc.component';
import { ListAcceptedComponent } from './admission-list1-list/list-accepted/list-accepted.component';
import { ListPassComponent } from './admission-list1-list/list-pass/list-pass.component';

const routes:Routes = [
  {
    path:'',
    component:AdmissionList1ListComponent
  },
  {
    path:'add',
    component:AdmissionList1FormComponent
  },
  {
    path:'edit/:id',
    component:AdmissionList1FormComponent
  },
 
]

@NgModule({
  declarations: [
    AdmissionList1ListComponent,
    AdmissionList1FormComponent,
    ListAddmissionComponent,
    ListDocComponent,
    ListAcceptedComponent,
    ListPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdmissionList1Module { }
