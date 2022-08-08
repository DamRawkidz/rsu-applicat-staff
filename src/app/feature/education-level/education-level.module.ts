import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationLevelListComponent } from './education-level-list/education-level-list.component';
import { EducationLevelFormComponent } from './education-level-form/education-level-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:EducationLevelListComponent
  },
  {
    path:'add',
    component:EducationLevelFormComponent
  },
  {
    path:'edit/:id',
    component:EducationLevelFormComponent
  },
]

@NgModule({
  declarations: [EducationLevelListComponent, EducationLevelFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EducationLevelModule { }
