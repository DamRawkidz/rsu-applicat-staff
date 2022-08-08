import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInstallmentListComponent } from './profile-installment-list/profile-installment-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopupSearchComponent } from './popup-search/popup-search.component';

const routes:Routes = [
  {
    path:'',
    component:ProfileInstallmentListComponent
  },
 
]

@NgModule({
  declarations: [
    ProfileInstallmentListComponent,
    PopupSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProfileInstallmentModule { }
