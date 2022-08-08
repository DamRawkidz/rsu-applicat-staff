import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortCourseListListComponent } from './short-course-list/short-course-list-list.component';
import { ShortCourseListFormComponent } from './short-course-list-form/short-course-list-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAddmissionComponent } from './short-course-list/list-addmission/list-addmission.component';
import { ListAcceptedComponent } from './short-course-list/list-accepted/list-accepted.component';

const routes:Routes = [
  {
    path:'',
    component:ShortCourseListListComponent
  },
  {
    path:'add',
    component:ShortCourseListFormComponent
  },
  {
    path:'edit/:id',
    component:ShortCourseListFormComponent
  },
 
]

@NgModule({
  declarations: [
    ShortCourseListListComponent,
    ShortCourseListFormComponent,
    ListAddmissionComponent,
    ListAcceptedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ShortCourseListModule { }
