import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramRegisterComponent } from './program-register/program-register.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { PaymentPopupComponent } from './payment-popup/payment-popup.component';
import { OtpComponent } from './otp/otp.component';
import { PopupSearchSchoolComponent } from './popup-search-school/popup-search-school.component';
import { PopupSearchProvinceComponent } from './popup-search-province/popup-search-province.component';
import { SearchProgramPipe } from './program-register/search-program.pipe';

const routes:Routes = [
  {
    path:'',
    component:ProgramRegisterComponent
  },
  {
    path:'otp',
    component:OtpComponent
  },
  {
    path:'edit/:id',
    component:RegisterComponent
  },
  
]

@NgModule({
  declarations: [ProgramRegisterComponent,RegisterComponent, PaymentPopupComponent, OtpComponent, PopupSearchSchoolComponent, PopupSearchProvinceComponent, SearchProgramPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EnrollModule { }
