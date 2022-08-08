import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseList } from 'src/app/core/base/base-list';
import { AppService } from 'src/app/core/service/app.service';
import { CouponService } from 'src/app/core/service/coupon.service';
import swal from 'sweetalert2'

@Component({
  selector: 'coupon-discount-list',
  templateUrl: './coupon-discount-list.component.html',
  styleUrls: ['./coupon-discount-list.component.scss']
})
export class CouponDiscountListComponent extends BaseList implements OnInit {
  rows:any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search : '',
  }
  constructor(public router:Router,
              public appSV:AppService,
              public CouponService:CouponService,
                      ) { super()
                       
                       }

  ngOnInit(): void {
    this.CouponService.getAll().pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
 
  deleteItem(id){
    // this.CouponService.deleteData(id).pipe(
    //   catchError(err => {
    //     // alert ตรงนี่
    //     this.appSV.swaltAlertError('', 'Error')
    //     return throwError(err)
    //   })).subscribe((x: any) => {
    //     console.log(x)
    //     this.ngOnInit()
    //     this.appSV.swaltAlert('ลบข้อมูลสำเสร็จ')
    //   })
    {
      swal.getTitle()
      swal.fire({
        text: 'ยืนยันการลบรายการ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        console.log(result)

        if (result.value) {
          this.CouponService.deleteData(id).pipe(
            catchError(err => {
              // alert ตรงนี่
              this.appSV.swaltAlertError('', 'Error')
              return throwError(err)
            })).subscribe((x: any) => {
              console.log(x)
              this.ngOnInit()
              this.appSV.swaltAlert('ลบข้อมูลสำเสร็จ')
            })


        }
      })
    }
  }
  addPage(){
    this.router.navigate(['app/coupon_discount/add'])
  }
  editPage(id){
    this.router.navigate(['app/coupon_discount/edit',id])
  }
}
