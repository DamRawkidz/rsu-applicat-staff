import { Component, OnInit } from '@angular/core';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { EducationLevelsService } from 'src/app/core/service/education-levels.service';
import swal from 'sweetalert2'

@Component({
  selector: 'education-level-list',
  templateUrl: './education-level-list.component.html',
  styleUrls: ['./education-level-list.component.scss']
})
export class EducationLevelListComponent extends BaseList implements OnInit {
  rows:any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search : '',
  }
  constructor(public router:Router,
              public appSV:AppService,
              public EducationLevelsService:EducationLevelsService,
                      ) { super()
                       
                       }

  ngOnInit(): void {
    this.EducationLevelsService.getAll().pipe(
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
    // console.log(this.searchInput.search)
    // this.EducationLevelsService.getSearchGemeral().subscribe((x:any)=>{
    //   console.log(x)
    //   this.rows = x
    //   this.rows = new MatTableDataSource(this.rows);
    //   this.rows.sort = this.sort
    //   this.rows.paginator = this.paginator;
    // })
  }
  deleteItem(id){
    // this.EducationLevelsService.deleteData(id).pipe(
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
          this.EducationLevelsService.deleteData(id).pipe(
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
    this.router.navigate(['app/education_level/add'])
  }
  editPage(id){
    this.router.navigate(['app/education_level/edit',id])
  }
}
