import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { BaseList } from 'src/app/core/base/base-list';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppService } from 'src/app/core/service/app.service';
import { SchoolService } from 'src/app/core/service/school.service';
import { ProvinceService } from 'src/app/core/service/province.service';

@Component({
  selector: 'school-data',
  templateUrl: './school-data.component.html',
  styleUrls: ['./school-data.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolDataComponent extends BaseList implements OnInit {
  rows:any = []
  province = []
  searchData = {
    school_code : '',
    school_name_th : '',
    province_code : ''
  }

  constructor(public router:Router,
              public appSV:AppService,
              public ProvinceService:ProvinceService,
              public SchoolService:SchoolService) { super()
              this.ProvinceService.getAllGemeral().subscribe(x=>{
                this.province = x
              })
              }



  ngOnInit(): void {
    this.SchoolService.getAllGemeral().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  } 
  addPage(){
    this.router.navigate(['app/school/add'])
  }
  editPage(id){
    console.log(id)
    this.router.navigate(['app/school/edit',id])
  }
  deleteItem(id){

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
          this.SchoolService.deleteDataGemeral(id).pipe(
            catchError(err => {
              // alert ตรงนี่
              this.appSV.swaltAlertError('', 'Error')
              return throwError(err)
            })).subscribe((x: any) => {
              console.log(x)
              this.appSV.swaltAlert('ลบข้อมูลสำเสร็จ')
              this.ngOnInit()
            })


        }
      })
    }

   
    // this.EmailTemplateService.deleteData(id).pipe(
    //   catchError(err => {
    //     // alert ตรงนี่
    //     this.appSV.swaltAlertError('', 'Error')
    //     return throwError(err)
    //   })).subscribe((x: any) => {
    //     console.log(x)
    //     this.ngOnInit()
    //     this.appSV.swaltAlert('ลบข้อมูลสำเสร็จ')
    //   })
  }
  clear(){
    this.searchData = {
      school_code : '',
      school_name_th : '',
      province_code : ''
    }
    this.ngOnInit()
  }
  search() {
    // console.log(this.searchInput)
    swal.fire({
      title: 'Please Wait !',
      html: 'data uploading',// add html attribute if you want or remove
      allowOutsideClick: false,
      onBeforeOpen: () => {
          swal.showLoading()
      },
  });
    this.SchoolService.queryGemeral(`?province_code=${this.searchData.province_code}&school_name_th=${this.searchData.school_name_th}&school_code=${this.searchData.school_code}`).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'ไม่พบข้อมูล')
        swal.close();
        return throwError(err)
      })
    ).subscribe((x: any) => {
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
      swal.close();
    })
  }
}
