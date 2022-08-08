import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectAddComponent } from './subject-add/subject-add.component';

const routes:Routes = [
  {
    path:'',
    component:SubjectComponent
  },
  {
    path:'add',
    component:SubjectAddComponent
  },
  {
    path:'edit/:id',
    component:SubjectAddComponent
  },
]

@NgModule({
  declarations: [SubjectComponent, SubjectAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SubjectModule { }
