import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListExamRoomSearchComponent } from './student-list-exam-room-search/student-list-exam-room-search.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListExamRoomListComponent } from './student-list-exam-room-list/student-list-exam-room-list.component';

const routes:Routes = [
  {
    path:'',
    component:StudentListExamRoomSearchComponent
  },
  {
    path:'list',
    component:StudentListExamRoomListComponent
  },
]

@NgModule({
  declarations: [StudentListExamRoomSearchComponent, StudentListExamRoomListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class StudentListExamRoomModule { }
