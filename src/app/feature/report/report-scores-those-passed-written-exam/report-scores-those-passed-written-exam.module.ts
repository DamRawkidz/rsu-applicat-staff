import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportScoresThosePassedWrittenExamListComponent } from './report-scores-those-passed-written-exam-list/report-scores-those-passed-written-exam-list.component';
import { ReportScoresThosePassedWrittenExamSearchComponent } from './report-scores-those-passed-written-exam-search/report-scores-those-passed-written-exam-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportScoresThosePassedWrittenExamSearchComponent
  },
  {
    path:'list',
    component:ReportScoresThosePassedWrittenExamListComponent
  },
]

@NgModule({
  declarations: [ReportScoresThosePassedWrittenExamListComponent, ReportScoresThosePassedWrittenExamSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportScoresThosePassedWrittenExamModule { }
