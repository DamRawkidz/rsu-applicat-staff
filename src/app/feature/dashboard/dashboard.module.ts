import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './dashboard/course-list/course-list.component';
import { ProgramListComponent } from './dashboard/program-list/program-list.component';

const routes:Routes = [
  {
    path:'',
    component:DashboardComponent
  },
]

@NgModule({
  declarations: [DashboardComponent, CourseListComponent, ProgramListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
