import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListCandidatesPassedHighestLowestListComponent } from './report-list-candidates-passed-highest-lowest-list/report-list-candidates-passed-highest-lowest-list.component';
import { ReportListCandidatesPassedHighestLowestSearchComponent } from './report-list-candidates-passed-highest-lowest-search/report-list-candidates-passed-highest-lowest-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportListCandidatesPassedHighestLowestSearchComponent
  },
  {
    path:'list',
    component:ReportListCandidatesPassedHighestLowestListComponent
  },
]

@NgModule({
  declarations: [ReportListCandidatesPassedHighestLowestListComponent, ReportListCandidatesPassedHighestLowestSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportListCandidatesPassedHighestLowestModule { }
