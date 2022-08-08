import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAdmissionListComponent } from './confirm-admission-list/confirm-admission-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TotalScoreConfirmPipe } from './confirm-admission-list/total-score-confirm.pipe';

const routes:Routes = [
  {
    path:'',
    component:ConfirmAdmissionListComponent
  },
  
]

@NgModule({
  declarations: [ConfirmAdmissionListComponent, TotalScoreConfirmPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ConfirmAdmissionModule { }
