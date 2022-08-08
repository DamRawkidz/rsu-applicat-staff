import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramTypeListComponent } from './program-type-list/program-type-list.component';
import { ProgramTypeFormComponent } from './program-type-form/program-type-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:ProgramTypeListComponent
  },
  {
    path:'add',
    component:ProgramTypeFormComponent
  },
  {
    path:'edit/:id',
    component:ProgramTypeFormComponent
  },
]

@NgModule({
  declarations: [ProgramTypeListComponent, ProgramTypeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProgramTypeModule { }
