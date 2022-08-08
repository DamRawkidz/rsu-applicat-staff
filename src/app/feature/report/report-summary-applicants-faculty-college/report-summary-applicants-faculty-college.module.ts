import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportSummaryApplicantsFacultyCollegeListComponent } from './report-summary-applicants-faculty-college-list/report-summary-applicants-faculty-college-list.component';
import { ReportSummaryApplicantsFacultyCollegeSearchComponent } from './report-summary-applicants-faculty-college-search/report-summary-applicants-faculty-college-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportSummaryApplicantsFacultyCollegeSearchComponent
  },
  {
    path:'list',
    component:ReportSummaryApplicantsFacultyCollegeListComponent
  }
]

@NgModule({
  declarations: [ReportSummaryApplicantsFacultyCollegeListComponent, ReportSummaryApplicantsFacultyCollegeSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportSummaryApplicantsFacultyCollegeModule { }
