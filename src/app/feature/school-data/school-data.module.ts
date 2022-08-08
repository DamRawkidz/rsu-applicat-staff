import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolDataComponent } from './school-data/school-data.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolDataAddComponent } from './school-data-add/school-data-add.component';

const routes:Routes = [
  {
    path:'',
    component:SchoolDataComponent
  },
  {
    path:'add',
    component:SchoolDataAddComponent
  },
  {
    path:'edit/:id',
    component:SchoolDataAddComponent
  },
]

@NgModule({
  declarations: [SchoolDataComponent, SchoolDataAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SchoolDataModule { }
