import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportAnnouncementWrittenExamResultsListComponent } from './report-announcement-written-exam-results-list/report-announcement-written-exam-results-list.component';
import { ReportAnnouncementWrittenExamResultsSearchComponent } from './report-announcement-written-exam-results-search/report-announcement-written-exam-results-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportAnnouncementWrittenExamResultsSearchComponent
  },
  {
    path:'list',
    component:ReportAnnouncementWrittenExamResultsListComponent
  },
]

@NgModule({
  declarations: [ReportAnnouncementWrittenExamResultsListComponent, ReportAnnouncementWrittenExamResultsSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportAnnouncementWrittenExamResultsModule { }
