import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProgramTypesService } from 'src/app/core/service/program-types.service';

@Component({
  selector: 'program-type-list',
  templateUrl: './program-type-list.component.html',
  styleUrls: ['./program-type-list.component.scss']
})
export class ProgramTypeListComponent extends BaseList implements OnInit {
  rows:any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search : '',
  }
  constructor(public router:Router,
              public appSV:AppService,
              public ProgramTypesService:ProgramTypesService,
                      ) { super()
                       
                       }

  ngOnInit(): void {
    this.ProgramTypesService.getAll().pipe(
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
    this.ProgramTypesService.search(this.searchInput.search).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  deleteItem(id){
    // this.ProgramTypesService.deleteData(id).pipe(
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
          this.ProgramTypesService.deleteData(id).pipe(
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
    this.router.navigate(['app/program_type/add'])
  }
  editPage(id){
    this.router.navigate(['app/program_type/edit',id])
  }
}
