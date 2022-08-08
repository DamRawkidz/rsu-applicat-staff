import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportStudentAdmissionsSearchComponent } from './report-student-admissions-search/report-student-admissions-search.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportStudentAdmissionsListComponent } from './report-student-admissions-list/report-student-admissions-list.component';

const routes:Routes = [
  {
    path:'',
    component:ReportStudentAdmissionsSearchComponent
  },
  {
    path:'list',
    component:ReportStudentAdmissionsListComponent
  },
]

@NgModule({
  declarations: [ReportStudentAdmissionsSearchComponent, ReportStudentAdmissionsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportStudentAdmissionsModule { }
