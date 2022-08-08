import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListApplicantsAddressListComponent } from './report-list-applicants-address-list/report-list-applicants-address-list.component';
import { ReportListApplicantsAddressSearchComponent } from './report-list-applicants-address-search/report-list-applicants-address-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportListApplicantsAddressSearchComponent
  },
  {
    path:'list',
    component:ReportListApplicantsAddressListComponent
  },
]

@NgModule({
  declarations: [ReportListApplicantsAddressListComponent, ReportListApplicantsAddressSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportListApplicantsAddressModule { }
