import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodePaymentComponent } from './qrcode-payment/qrcode-payment.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:QrcodePaymentComponent,
  } 
  
]

@NgModule({
  declarations: [QrcodePaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class QrcodePaymentModule { }
