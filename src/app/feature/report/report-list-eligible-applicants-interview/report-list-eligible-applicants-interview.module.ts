import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListEligibleApplicantsInterviewComponent } from './report-list-eligible-applicants-interview/report-list-eligible-applicants-interview.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListEligibleApplicantsInterviewListComponent } from './report-list-eligible-applicants-interview-list/report-list-eligible-applicants-interview-list.component';

const routes:Routes = [
  {
    path:'',
    component:ReportListEligibleApplicantsInterviewListComponent
  },
  {
    path:'list',
    component:ReportListEligibleApplicantsInterviewComponent
  },
]

@NgModule({
  declarations: [ReportListEligibleApplicantsInterviewComponent, ReportListEligibleApplicantsInterviewListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportListEligibleApplicantsInterviewModule { }
