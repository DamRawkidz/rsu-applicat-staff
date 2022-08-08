import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportShowsTestInformationListComponent } from './report-shows-test-information-list/report-shows-test-information-list.component';
import { ReportShowsTestInformationSearchComponent } from './report-shows-test-information-search/report-shows-test-information-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportShowsTestInformationSearchComponent
  },
  {
    path:'list',
    component:ReportShowsTestInformationListComponent
  },
]

@NgModule({
  declarations: [ReportShowsTestInformationListComponent, ReportShowsTestInformationSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportShowsTestInformationModule { }
