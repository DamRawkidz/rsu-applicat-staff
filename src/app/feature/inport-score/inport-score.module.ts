import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InportScoreContainerContainer } from './inport-score-container/inport-score-container.container';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InportScoreListComponent } from './presenter/inport-score-list/inport-score-list.component';
import { PopupEditScoreComponent } from './presenter/popup-edit-score/popup-edit-score.component';

const routes:Routes = [
  {
    path:'',
    component:InportScoreContainerContainer
  },
  
]

@NgModule({
  declarations: [InportScoreContainerContainer,InportScoreListComponent, PopupEditScoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InportScoreModule { }
