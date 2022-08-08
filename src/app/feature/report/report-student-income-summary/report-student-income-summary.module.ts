import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportStudentIncomeSummaryListComponent } from './report-student-income-summary-list/report-student-income-summary-list.component';
import { ReportStudentIncomeSummarySearchComponent } from './report-student-income-summary-search/report-student-income-summary-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportStudentIncomeSummarySearchComponent
  },
  {
    path:'list',
    component:ReportStudentIncomeSummaryListComponent
  },
]

@NgModule({
  declarations: [ReportStudentIncomeSummaryListComponent, ReportStudentIncomeSummarySearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportStudentIncomeSummaryModule { }
