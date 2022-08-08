import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetMessageComponent } from './set-message/set-message.component';

const routes:Routes = [
  {
    path:'',
    component:SetMessageComponent
  },
]

@NgModule({
  declarations: [SetMessageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SetMessageModule { }
