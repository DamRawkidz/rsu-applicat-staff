import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListApplicantsSchoolProvinceListComponent } from './report-list-applicants-school-province-list/report-list-applicants-school-province-list.component';
import { ReportListApplicantsSchoolProvinceSearchComponent } from './report-list-applicants-school-province-search/report-list-applicants-school-province-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportListApplicantsSchoolProvinceSearchComponent
  },
  {
    path:'list',
    component:ReportListApplicantsSchoolProvinceListComponent
  }
]

@NgModule({
  declarations: [ReportListApplicantsSchoolProvinceListComponent, ReportListApplicantsSchoolProvinceSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportListApplicantsSchoolProvinceModule { }
