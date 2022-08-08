import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeSocketComponent } from './qrcode-socket/qrcode-socket.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentSocketComponent } from './payment-socket/payment-socket.component';

const routes: Routes = [
  {
    path:'',
    component:QrcodeSocketComponent
  }
]

@NgModule({
  declarations: [
    QrcodeSocketComponent,
    PaymentSocketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class QrcodeSocketModule { }
