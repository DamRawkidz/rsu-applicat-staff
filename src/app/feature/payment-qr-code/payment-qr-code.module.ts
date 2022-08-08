import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentQrCodeComponent } from './payment-qr-code/payment-qr-code.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:PaymentQrCodeComponent
  },
]

@NgModule({
  declarations: [PaymentQrCodeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PaymentQrCodeModule { }
