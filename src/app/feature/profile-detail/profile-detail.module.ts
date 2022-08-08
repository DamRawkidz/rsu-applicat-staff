import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileDetailListComponent } from './profile-detail-list/profile-detail-list.component';
import { SearchProgramProfilePipe } from './profile-detail/search-program-profile.pipe';
import { PaymentRegisterPlansPopupComponent } from './payment-register-plans-popup/payment-register-plans-popup.component';
import { StatusCoursePipe } from './profile-detail/status-course.pipe';

const routes:Routes = [
  {
    path:'',
    component:ProfileDetailListComponent
  },
  {
    path:'edit/:id',
    component:ProfileDetailComponent
  },
  {
    path:'register/:id',
    component: ProfileRegisterComponent
  },
  {
    path:'paymentQRCode',
    component: PaymentRegisterPlansPopupComponent
  }
]

@NgModule({
  declarations: [
    ProfileDetailComponent, 
    ProfileDetailListComponent, 
    SearchProgramProfilePipe,
    ProfileRegisterComponent,
    PaymentRegisterPlansPopupComponent,
    StatusCoursePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProfileDetailModule { }
