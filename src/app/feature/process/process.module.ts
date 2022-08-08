import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessPopupComponent } from './process-popup/process-popup.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TotalScorePipe } from './process-list/total-score.pipe';


const routes:Routes = [
  {
    path:'',
    component:ProcessListComponent
  },
  
]

@NgModule({
  declarations: [ProcessListComponent, ProcessPopupComponent, TotalScorePipe,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProcessModule { }
