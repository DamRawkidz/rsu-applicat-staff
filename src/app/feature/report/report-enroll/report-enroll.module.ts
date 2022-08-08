import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportEnrollComponent } from './report-enroll/report-enroll.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'edit/:id',
    component:ReportEnrollComponent,
  } 
  
]

@NgModule({
  declarations: [ReportEnrollComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportEnrollModule { }
