import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponDiscountListComponent } from './coupon-discount-list/coupon-discount-list.component';
import { CouponDiscountFormComponent } from './coupon-discount-form/coupon-discount-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:CouponDiscountListComponent
  },
  {
    path:'add',
    component:CouponDiscountFormComponent
  },
  {
    path:'edit/:id',
    component:CouponDiscountFormComponent
  },
]

@NgModule({
  declarations: [CouponDiscountListComponent, CouponDiscountFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CouponDiscountModule { }
