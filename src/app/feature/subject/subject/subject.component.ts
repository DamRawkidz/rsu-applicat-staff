import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { MatTableDataSource } from '@angular/material/table';
import { BaseList } from 'src/app/core/base/base-list';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2'
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectComponent extends BaseList  implements OnInit {
  rows:any = []
  constructor(public router:Router,
              public appSV :AppService,
              public ExamSubjectsService:ExamSubjectsService) {super() }

  ngOnInit(): void {
    this.ExamSubjectsService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  } 
  addPage(){
    this.router.navigate(['app/subject/add'])
  }
  editPage(id){
    this.router.navigate(['app/subject/edit',id])
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
          this.ExamSubjectsService.deleteData(id).pipe(
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
