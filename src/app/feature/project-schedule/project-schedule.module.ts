import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectScheduleComponent } from './presenter/project-schedule/project-schedule.component';
import { ListProjectScheduleContainer } from './container/list-project-schedule/list-project-schedule.container';
import { EditProjectScheduleComponent } from './presenter/edit-project-schedule/edit-project-schedule.component';
import { AddProjectScheduleComponent } from './presenter/add-project-schedule/add-project-schedule.component';
import { AddCourseComponent } from './presenter/add-course/add-course.component';
import { PopupExaminationfeeComponent } from './presenter/popup-examinationfee/popup-examinationfee.component';
import { PopupcopyProgramComponent } from './presenter/popup-copy-program/popup-copy-program.component';
import { PopupInterviewComponent } from './presenter/popup-interview/popup-interview.component';
import { PopupExamComponent } from './presenter/popup-exam/popup-exam.component';
import { CheckDocProgramPipe } from './presenter/add-project-schedule/check-doc-program.pipe';
import { EditCourseComponent } from './presenter/edit-course/edit-course.component';
import { CheckCoursePipe } from './presenter/add-project-schedule/check-course.pipe';
import { SearchCoursePipe } from './presenter/add-course/search-course.pipe';
import { CheckedCourseAddPipe } from './presenter/add-course/checked-course-add.pipe';
import { CheckDocCoursePipe } from './presenter/edit-course/check-doc-course.pipe';
import { CheckCoseProgramPipe } from './presenter/add-project-schedule/check-cose-program.pipe';

const routes:Routes = [
  {
    path:'',
    component:ProjectScheduleComponent
  },
  {
    path:'add',
    component:AddProjectScheduleComponent
  },
  {
    path:'edit/:id',
    component:AddProjectScheduleComponent
  },
  {
    path:'add-course',
    component:AddCourseComponent
  },
  {
    path:'course/edit/:id',
    component:AddCourseComponent
  },
]

@NgModule({
  declarations: [
                ProjectScheduleComponent, 
                ListProjectScheduleContainer, 
                EditProjectScheduleComponent,
                AddProjectScheduleComponent,
                AddCourseComponent,
                PopupExaminationfeeComponent,
                PopupcopyProgramComponent,
                PopupInterviewComponent,
                PopupExamComponent,
                CheckDocProgramPipe,
                EditCourseComponent,
                CheckCoursePipe,
                SearchCoursePipe,
                CheckedCourseAddPipe,
                CheckDocCoursePipe,
                CheckCoseProgramPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProjectScheduleModule { }
