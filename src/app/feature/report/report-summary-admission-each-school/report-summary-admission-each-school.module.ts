import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportSummaryAdmissionEachSchoolListComponent } from './report-summary-admission-each-school-list/report-summary-admission-each-school-list.component';
import { ReportSummaryAdmissionEachSchoolSearchComponent } from './report-summary-admission-each-school-search/report-summary-admission-each-school-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportSummaryAdmissionEachSchoolListComponent
  },
  {
    path:'list',
    component:ReportSummaryAdmissionEachSchoolSearchComponent
  },
]

@NgModule({
  declarations: [ReportSummaryAdmissionEachSchoolListComponent, ReportSummaryAdmissionEachSchoolSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportSummaryAdmissionEachSchoolModule { }
