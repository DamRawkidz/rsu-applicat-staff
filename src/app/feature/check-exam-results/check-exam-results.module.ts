import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckExamResultsContainer } from './check-exam-results/check-exam-results.container';
import { CheckExamResultsListComponent } from './presenter/check-exam-results-list/check-exam-results-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopupListComponent } from './presenter/popup-list/popup-list.component';
import { PopupDetailScoreComponent } from './presenter/popup-detail-score/popup-detail-score.component';
import { PopupAnnounceComponent } from './presenter/popup-announce/popup-announce.component';
import { PopupInterviewResultsComponent } from './presenter/popup-interview-results/popup-interview-results.component';
import { PopupSelectionResultsComponent } from './presenter/popup-selection-results/popup-selection-results.component';
import { Report1Component } from './presenter/report1/report1.component';
import { Report2Component } from './presenter/report2/report2.component';


const routes:Routes = [
  {
    path:'',
    component:CheckExamResultsContainer
  },
  {
    path:'report1',
    component:Report1Component
  },
  {
    path:'report2',
    component:Report2Component
  },
]


@NgModule({
  declarations: [CheckExamResultsContainer, CheckExamResultsListComponent, PopupListComponent, PopupDetailScoreComponent, PopupAnnounceComponent, PopupInterviewResultsComponent, PopupSelectionResultsComponent, Report1Component, Report2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CheckExamResultsModule { }
