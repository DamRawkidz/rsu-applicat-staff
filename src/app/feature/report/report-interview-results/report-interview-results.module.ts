import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportInterviewResultsListComponent } from './report-interview-results-list/report-interview-results-list.component';
import { ReportInterviewResultsSearchComponent } from './report-interview-results-search/report-interview-results-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportInterviewResultsSearchComponent
  },
  {
    path:'list',
    component:ReportInterviewResultsListComponent
  },
]

@NgModule({
  declarations: [ReportInterviewResultsListComponent, ReportInterviewResultsSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportInterviewResultsModule { }
