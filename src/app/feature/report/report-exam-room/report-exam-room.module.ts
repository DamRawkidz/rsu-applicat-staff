import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportExamRoomListComponent } from './report-exam-room-list/report-exam-room-list.component';
import { ReportExamRoomSearchComponent } from './report-exam-room-search/report-exam-room-search.component';

const routes:Routes = [
  {
    path:'',
    component:ReportExamRoomSearchComponent
  },
  {
    path:'list',
    component:ReportExamRoomListComponent
  },
]

@NgModule({
  declarations: [ReportExamRoomListComponent, ReportExamRoomSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportExamRoomModule { }
