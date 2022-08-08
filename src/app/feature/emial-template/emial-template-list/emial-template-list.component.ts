import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, delay } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { throwError } from 'rxjs';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';
import { BaseList } from 'src/app/core/base/base-list';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2'

@Component({
  selector: 'emial-template-list',
  templateUrl: './emial-template-list.component.html',
  styleUrls: ['./emial-template-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmialTemplateListComponent extends BaseList implements OnInit {
  rows:any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search : '',
  }
  constructor(public router:Router,
              public appSV:AppService,
              public EmailTemplateService:EmailTemplateService,
                      ) { super()
                       
                       }

  ngOnInit(): void {
    this.EmailTemplateService.getAll().pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      }),
      tap((x:any)=>{
        console.log(x)
        this.rows = x
        this.rows = new MatTableDataSource(this.rows);
        this.rows.sort = this.sort
        this.rows.paginator = this.paginator;
      })
    )
    
    .subscribe((x:any)=>{
      
    })
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  search(){
    console.log(this.searchInput.search)
    this.EmailTemplateService.search(this.searchInput.search).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })
    ).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
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
          this.EmailTemplateService.deleteData(id).pipe(
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
  addPage(){
    this.router.navigate(['app/email-template/add'])
  }
  editPage(id){
    this.router.navigate(['app/email-template/edit',id])
  }
}
