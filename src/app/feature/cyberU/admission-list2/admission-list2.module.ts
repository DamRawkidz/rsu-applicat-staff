import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionList2ListComponent } from './admission-list2-list/admission-list2-list.component';
import { AdmissionList2FormComponent } from './admission-list2-form/admission-list2-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAddmissionComponent } from './admission-list2-list/list-addmission/list-addmission.component';
import { ListDocComponent } from './admission-list2-list/list-doc/list-doc.component';
import { ListAcceptedComponent } from './admission-list2-list/list-accepted/list-accepted.component';
import { ListPassComponent } from './admission-list2-list/list-pass/list-pass.component';

const routes:Routes = [
  {
    path:'',
    component:AdmissionList2ListComponent
  },
  {
    path:'add',
    component:AdmissionList2FormComponent
  },
  {
    path:'edit/:id',
    component:AdmissionList2FormComponent
  },
 
]

@NgModule({
  declarations: [
    AdmissionList2ListComponent,
    AdmissionList2FormComponent,
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
export class AdmissionList2Module { }
