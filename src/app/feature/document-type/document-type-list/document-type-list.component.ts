import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { AppService } from 'src/app/core/service/app.service';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2'

@Component({
  selector: 'document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeListComponent extends BaseList implements OnInit {
  rows:any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search : '',
  }
  constructor(public router:Router,
              public appSV:AppService,
              public DocumentTypesService:DocumentTypesService,
                      ) { super()
                       
                       }

  ngOnInit(): void {
    this.DocumentTypesService.getAll().pipe(
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
  search(){
    console.log(this.searchInput.search)
    this.DocumentTypesService.search(this.searchInput.search).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  deleteItem(id){
    // this.DocumentTypesService.deleteData(id).pipe(
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
          this.DocumentTypesService.deleteData(id).pipe(
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
    this.router.navigate(['app/document_type/add'])
  }
  editPage(id){
    this.router.navigate(['app/document_type/edit',id])
  }
}
