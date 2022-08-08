import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InqireContainerContainer } from './container/inqire-container/inqire-container.container';
import { InquireListComponent } from './presenter/inquire-list/inquire-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InquireConsiderComponent } from './presenter/inquire-consider/inquire-consider.component';
import { InquireListDataComponent } from './presenter/inquire-list-data/inquire-list-data.component';
import { InquirePaymentComponent } from './presenter/inquire-payment/inquire-payment.component';
import { InquireConsiderBranchesComponent } from './presenter/inquire-consider-branches/inquire-consider-branches.component';
import { PopupInquireBranchesComponent } from './presenter/popup-inquire-branches/popup-inquire-branches.component';

const routes:Routes = [
  {
    path:'',
    component:InqireContainerContainer
  },
]

@NgModule({
  declarations: [InqireContainerContainer, InquireListComponent, InquireConsiderComponent, InquireListDataComponent, InquirePaymentComponent, InquireConsiderBranchesComponent, PopupInquireBranchesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InquireModule { }
