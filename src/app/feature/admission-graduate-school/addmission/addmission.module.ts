import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddmissionListComponent } from './addmission-list/addmission-list.component';
import { AddmissionFormComponent } from './addmission-form/addmission-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAddmissionComponent } from './addmission-list/list-addmission/list-addmission.component';
import { ListWrittenExamComponent } from './addmission-list/list-written-exam/list-written-exam.component';
import { ListInterviewComponent } from './addmission-list/list-interview/list-interview.component';
import { ListPassComponent } from './addmission-list/list-pass/list-pass.component';

const routes:Routes = [
  {
    path:'',
    component:AddmissionListComponent
  },
  {
    path:'add',
    component:AddmissionFormComponent
  },
  {
    path:'edit/:id',
    component:AddmissionFormComponent
  },
 
]

@NgModule({
  declarations: [
    AddmissionListComponent,
    AddmissionFormComponent,
    ListAddmissionComponent,
    ListWrittenExamComponent,
    ListInterviewComponent,
    ListPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AddmissionModule { }
