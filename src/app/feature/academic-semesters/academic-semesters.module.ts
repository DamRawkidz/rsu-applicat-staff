import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicSemestersListComponent } from './academic-semesters-list/academic-semesters-list.component';
import { AcademicSemestersFormComponent } from './academic-semesters-form/academic-semesters-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:AcademicSemestersListComponent
  },
  {
    path:'add',
    component:AcademicSemestersFormComponent
  },
  {
    path:'edit/:id',
    component:AcademicSemestersFormComponent
  },
  
]

@NgModule({
  declarations: [AcademicSemestersListComponent, AcademicSemestersFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AcademicSemestersModule { }
