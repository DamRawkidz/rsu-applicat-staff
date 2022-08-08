import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import swal from 'sweetalert2'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'academic-semesters-list',
  templateUrl: './academic-semesters-list.component.html',
  styleUrls: ['./academic-semesters-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicSemestersListComponent extends BaseList  implements OnInit {
  rows:any = []
  academicYear = []
  constructor(public router:Router,
              public AcademicYearService:AcademicYearService,
              public appSV :AppService,
              public AcademicSemesterService:AcademicSemesterService) {super()
              this.AcademicYearService.getAll().subscribe(x=>{
                this.academicYear = x
              })
              }

  ngOnInit(): void {
    this.AcademicSemesterService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  } 
  addPage(){
    this.router.navigate(['app/academic_semesters/add'])
  }
  editPage(id){
    this.router.navigate(['app/academic_semesters/edit',id])
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
          this.AcademicSemesterService.deleteData(id).pipe(
            catchError(err => {
              // alert ตรงนี่
              this.appSV.swaltAlertError('', 'Error')
              return throwError(err)
            })).subscribe((x: any) => {
              console.log(x)
              this.ngOnInit()
              this.appSV.swaltAlert('','ลบข้อมูลสำเสร็จ')
            })


        }
      })
    }
  }
}
