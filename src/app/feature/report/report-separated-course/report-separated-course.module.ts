import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSeparatedCourseSearchComponent } from './report-separated-course-search/report-separated-course-search.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportSeparatedCourseListComponent } from './report-separated-course-list/report-separated-course-list.component';

const routes:Routes = [
  {
    path:'',
    component:ReportSeparatedCourseSearchComponent
  },
  {
    path:'list',
    component:ReportSeparatedCourseListComponent
  },
]

@NgModule({
  declarations: [ ReportSeparatedCourseSearchComponent, ReportSeparatedCourseListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportSeparatedCourseModule { }
