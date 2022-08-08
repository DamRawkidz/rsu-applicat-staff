import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportRecruitmentStatisticsListComponent } from './report-recruitment-statistics-list/report-recruitment-statistics-list.component';
import { ReportRecruitmentStatisticsSearchComponent } from './report-recruitment-statistics-search/report-recruitment-statistics-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportRecruitmentStatisticsSearchComponent
  },
  {
    path:'list',
    component:ReportRecruitmentStatisticsListComponent
  },
]

@NgModule({
  declarations: [ReportRecruitmentStatisticsListComponent, ReportRecruitmentStatisticsSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportRecruitmentStatisticsModule { }
