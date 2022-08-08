import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicYearsListComponent } from './academic-years-list/academic-years-list.component';
import { AcademicYearsFormComponent } from './academic-years-form/academic-years-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:AcademicYearsListComponent
  },
  {
    path:'add',
    component:AcademicYearsFormComponent
  },
  {
    path:'edit/:id',
    component:AcademicYearsFormComponent
  },
  
]

@NgModule({
  declarations: [AcademicYearsListComponent, AcademicYearsFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AcademicYearsModule { }
