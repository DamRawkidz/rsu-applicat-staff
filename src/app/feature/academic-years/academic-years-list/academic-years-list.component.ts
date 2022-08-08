import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import swal from 'sweetalert2'
import { AppService } from 'src/app/core/service/app.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'academic-years-list',
  templateUrl: './academic-years-list.component.html',
  styleUrls: ['./academic-years-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearsListComponent extends BaseList  implements OnInit {
  rows:any = []
  constructor(public router:Router,
              public appSV :AppService,
              public AcademicYearService:AcademicYearService) {super() }

  ngOnInit(): void {
    this.AcademicYearService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  } 
  addPage(){
    this.router.navigate(['app/academic_years/add'])
  }
  editPage(id){
    this.router.navigate(['app/academic_years/edit',id])
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
          this.AcademicYearService.deleteData(id).pipe(
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
}
