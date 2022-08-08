import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { StatusService } from 'src/app/core/service/status.service';
import { BaseList } from 'src/app/core/base/base-list';
import { catchError, tap, delay } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { throwError } from 'rxjs';
import swal from 'sweetalert2'
import { MatSort } from '@angular/material/sort';
import { PopupcopyProgramComponent } from '../popup-copy-program/popup-copy-program.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'project-schedule',
  templateUrl: './project-schedule.component.html',
  styleUrls: ['./project-schedule.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectScheduleComponent extends BaseList implements OnInit {
  rows: any = []
  academicSemesterData = []
  academicYearData = []
  statusData = []
  searchInput = {
    search: ''
  }
  programCopy = null
  
  // search : any
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public router: Router,
    public ProgramsService: ProgramsService,
    public appSV: AppService,
    public AcademicYearService: AcademicYearService,
    public StatusService: StatusService,
    public dialog: MatDialog,
    public AcademicSemesterService: AcademicSemesterService,
  ) {
    super()
    this.AcademicSemesterService.getAll().subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
    this.AcademicYearService.getAll().subscribe((x: any) => {
      console.log(x)
      this.academicYearData = x
    })
    this.StatusService.getAll().subscribe((x: any) => {
      this.statusData = x
      console.log(this.statusData)
    })
  }

  ngOnInit(): void {
    this.ProgramsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  search() {
    console.log(this.searchInput)
    this.ProgramsService.search(this.searchInput.search).subscribe((x: any) => {
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
  gotoAddProjectSchedulePage() {
    this.router.navigate(['app/Project/add'])
  }
  copyProgram() {
    console.log(this.programCopy);
    
   if(this.programCopy == null){
    this.appSV.swaltAlertError('', 'กรุณาเลือกโครงการที่จะคัดลอก')
   }else{
      const dialogRef = this.dialog.open(
        PopupcopyProgramComponent, {
        // width: '50%',
        data: this.programCopy  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
      }
      )
  
      dialogRef.afterClosed().subscribe(callback => {
        console.log(callback)
        this.ngOnInit()
      })
  
   }
  }
  changeProgram(data){
    console.log(data);
    
    this.programCopy =data
  }
  gotoEditProjectSchedulePage(id) {
    this.router.navigate(['app/Project/edit', id])
  }
  deleteItem(id) {

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
          this.ProgramsService.deleteData(id).pipe(
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
