import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptReportComponent } from './receipt-report/receipt-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'edit/:id',
    component:ReceiptReportComponent,
  } 
  
]

@NgModule({
  declarations: [ReceiptReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ReceiptReportModule { }
