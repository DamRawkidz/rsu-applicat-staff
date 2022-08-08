import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportLabelSchoolAddressListComponent } from './report-label-school-address-list/report-label-school-address-list.component';
import { ReportLabelSchoolAddressSearchComponent } from './report-label-school-address-search/report-label-school-address-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportLabelSchoolAddressSearchComponent
  },
  {
    path:'list',
    component:ReportLabelSchoolAddressListComponent
  },
]

@NgModule({
  declarations: [ReportLabelSchoolAddressListComponent, ReportLabelSchoolAddressSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportLabelSchoolAddressModule { }
