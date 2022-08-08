import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTotalApplyOnlineComponent } from './student-total-apply-online/student-total-apply-online.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentTotalApplyOnlineListComponent } from './student-total-apply-online-list/student-total-apply-online-list.component';

const routes:Routes = [
  {
    path:'',
    component:StudentTotalApplyOnlineComponent
  },
  {
    path:'list',
    component:StudentTotalApplyOnlineListComponent
  }
]

@NgModule({
  declarations: [StudentTotalApplyOnlineComponent, StudentTotalApplyOnlineListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class StudentTotalApplyOnlineModule { }
