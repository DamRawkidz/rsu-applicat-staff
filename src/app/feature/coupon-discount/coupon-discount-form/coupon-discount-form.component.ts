import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { AppService } from 'src/app/core/service/app.service';
import { CouponTypeService } from 'src/app/core/service/coupon-type.service';
import { CouponService } from 'src/app/core/service/coupon.service';
import { StatusService } from 'src/app/core/service/status.service';

@Component({
  selector: 'coupon-discount-form',
  templateUrl: './coupon-discount-form.component.html',
  styleUrls: ['./coupon-discount-form.component.scss']
})
export class CouponDiscountFormComponent extends BaseForm implements OnInit {
  
  couponTypeData = []
  couponData = []
  statusData = []
  date = new Date()
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public CouponService: CouponService,
    public CouponTypeService: CouponTypeService,
    public StatusService: StatusService,
    public router: Router,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.CouponService.getAll().subscribe(x=>{
      this.couponData = x
    })
    this.CouponTypeService.getAll().subscribe(x=>{
      this.couponTypeData = x
      let i = this.couponTypeData.findIndex(x=>x.coupon_type_id == 2)
      if(i){
        this.couponTypeData.splice(i,1)
      }
    })
    this.StatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.statusData = x
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.CouponService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            coupon_id:res.coupon_id,
            coupon_code:res.coupon_code,
            coupon_name_en:res.coupon_name_en,
            coupon_name_th:res.coupon_name_th,
            coupon_type_id:res.coupon_type_id,
            expiry_date:res.expiry_date,
            quantity:res.quantity,
            used:res.used,
            amount:res.amount,
            status_id:res.status_id,
            create_by:res.create_by,
            create_date:res.create_date,
            last_update_by:res.last_update_by,
            last_update_date:res.last_update_date,          
          })
          let i = this.couponData.findIndex(x=>x.coupon_code == res.coupon_code)
          if(i != -1){
            this.couponData.splice(i,1)
          }
          
        })
        break;
      case 'add':
       
        break;
    }
  }
  save(){

    if(this.form.get('coupon_id').value != null){
      // let data = this.couponData.find(x=>x.coupon_code == this.form.get('coupon_code').value)
      // if(data){
      //   this.appSV.swaltAlertError('', 'รหัสซ้ำกัน')
      // }else{
      console.log(this.form.getRawValue())
      this.CouponService.update(this.form.get('coupon_id').value,this.form.getRawValue()).pipe(
      catchError(err => {
        // alert ตรงนี่
        if(err.error.err == 400){
          this.appSV.swaltAlertError('', err.error.msg)
        }else{
          this.appSV.swaltAlertError('', 'Error')
        }
        return throwError(err)
      })).subscribe((x: any) => {
        console.log(x)
        // this.SubjectComponent.ngOnInit()
        this.appSV.swaltAlert()
        this.router.navigate(['app/coupon_discount'])
      })
    // }
      
    }else{
      // let data = this.couponData.find(x=>x.coupon_code == this.form.get('coupon_code').value)
      // if(data){
      //   this.appSV.swaltAlertError('', 'รหัสซ้ำกัน')
      // }else{
      console.log(this.form.getRawValue())
      this.CouponService.add(this.form.getRawValue()).pipe(
      catchError(err => {
        // alert ตรงนี่
        console.log(err.error.err)
        if(err.error.err == 400){
          this.appSV.swaltAlertError('', err.error.msg)
        }else{
          this.appSV.swaltAlertError('', 'Error')
        }
        
        return throwError(err)
      })).subscribe((x: any) => {
        console.log(x)
        // this.SubjectComponent.ngOnInit()
        this.appSV.swaltAlert()
        this.router.navigate(['app/coupon_discount'])
      })
    // }
    }
   
  }
  dateChange(date: moment.Moment,text){
    this.form.get(`${text}`).setValue(moment(date).add(7,'hours').toDate())
  }
  close(){
    this.router.navigate(['app/coupon_discount'])
  }
  createForm() {
    return this.baseFormBuilder.group({
      coupon_id: [null],
      coupon_code: [''],
      coupon_name_en: [''],
      coupon_name_th: [''],
      coupon_type_id: [1],
      expiry_date: [null],
      quantity: [0],
      used: [0],
      amount: [0],
      status_id: [0],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}