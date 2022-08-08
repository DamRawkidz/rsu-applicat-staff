import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArrangeRoomContainerContainer } from './arrange-room-container/arrange-room-container.container';
import { ArrangeRoomListComponent } from './presenter/arrange-room-list/arrange-room-list.component';
import { ExaminationRoomProcessComponent } from './presenter/examination-room-process/examination-room-process.component';
import { PopupExamSettingComponent } from './presenter/popup-exam-setting/popup-exam-setting.component';

const routes:Routes = [
  {
    path:'',
    component:ArrangeRoomContainerContainer
  },
  {
    path:'process',
    component:ExaminationRoomProcessComponent
  },
]

@NgModule({
  declarations: [ArrangeRoomContainerContainer,ArrangeRoomListComponent,ExaminationRoomProcessComponent, PopupExamSettingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ArrangeRoomModule { }
