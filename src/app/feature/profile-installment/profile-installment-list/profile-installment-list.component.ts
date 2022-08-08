import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseList } from 'src/app/core/base/base-list';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import swal from 'sweetalert2'
import { PopupSearchComponent } from '../popup-search/popup-search.component';

@Component({
  selector: 'profile-installment-list',
  templateUrl: './profile-installment-list.component.html',
  styleUrls: ['./profile-installment-list.component.scss']
})
export class ProfileInstallmentListComponent extends BaseList implements OnInit {
  searchInput = {
    personal_id: '',
  }
  rows: any = []
  educationTypesData: any = []
  applicationStatusData: any = []
  academicSemesterData: any = []
  academicYearData: any = []
  programsData: any = []
  courseData: any = []
  schoolData: any = []
  provinceData: any = []
  constructor(public router: Router,
    public ApplicantService: ApplicantService,
    public appSV: AppService,
    public dialog: MatDialog,
    public ApplicationStatusService: ApplicationStatusService,
    public ApplicantApplysService: ApplicantApplysService,
  ) {
    super()
   
    // this.AcademicSemesterService.getAll().subscribe((x: any) => {
    //   this.academicSemesterData = x
    // })
  
  }
  openSearch() {
  
    
  
      const dialogRef = this.dialog.open(
        PopupSearchComponent, {
        width: '80%',
        data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
      }
      )
  
      dialogRef.afterClosed().subscribe(callback => {
        console.log(callback)
        // this.ngOnInit()
      })
  
   
  }
  ngOnInit(): void {
    // this.ApplicantApplysService.getAll().subscribe((x: any) => {
    //   this.rows = x
    //   this.rows = this.rows.filter(x=>x.application_status_id != 1)
    //   this.rows = new MatTableDataSource(this.rows);
    //   this.rows.sort = this.sort
    //   console.log(this.rows)
    //   // this.rows.paginator = this.paginator;
    // })
  }
  clear(){
    this.searchInput = {
      personal_id: '',
     
    }
    this.rows = []
  }
  addPage(id) {
    this.router.navigate(['app/profile-detail/edit',id])
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  
  createQueryStringFromObject = (object: any):string => {
    let queryStr: string = ''

    for (const key in object) {
        if (object[key]) {
            queryStr += `${key}=${object[key]}&`        
        }
    }
    let lastIndex = queryStr.lastIndexOf('&')
    queryStr = queryStr.slice(0,lastIndex)
    return queryStr
}
  search() {

    swal.fire({
      title: 'Please Wait !',
      html: 'data uploading',// add html attribute if you want or remove
      allowOutsideClick: false,
      onBeforeOpen: () => {
          swal.showLoading()
      },
  });
    
    let queryString = this.createQueryStringFromObject(this.searchInput)
    console.log(queryString)
    this.ApplicantApplysService.query(`?${queryString}`).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'ไม่พบข้อมูลผู้สมัคร')
        swal.close();
        return throwError(err)
      })
    ).subscribe((x: any) => {
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      swal.close();
      this.rows.paginator = this.paginator;
    })
  }
}
