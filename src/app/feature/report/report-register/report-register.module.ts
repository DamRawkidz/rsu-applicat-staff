import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRegisterComponent } from './report-register/report-register.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'edit/:id',
    component:ReportRegisterComponent,
  } 
  
]

@NgModule({
  declarations: [ReportRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReportRegisterModule { }
