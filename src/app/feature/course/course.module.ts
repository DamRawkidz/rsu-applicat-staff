import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckDocumentPipe } from './course-form/check-document.pipe';

const routes:Routes = [
  {
    path:'',
    component:CourseListComponent
  },
  {
    path:'add',
    component:CourseFormComponent
  },
  {
    path:'edit/:id',
    component:CourseFormComponent
  },
]

@NgModule({
  declarations: [CourseListComponent, CourseFormComponent, CheckDocumentPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CourseModule { }
