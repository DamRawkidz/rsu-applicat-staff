import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { BaseList } from 'src/app/core/base/base-list';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PopupInquireBranchesComponent } from '../popup-inquire-branches/popup-inquire-branches.component';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { catchError } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'inquire-list',
  templateUrl: './inquire-list.component.html',
  styleUrls: ['./inquire-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquireListComponent extends BaseList implements OnInit {
  rows:any = []
  educationTypesData:any = []
  searchInput = {
    search : ''
  }
  totalData = 0
  constructor(
    public dialog: MatDialog,
    public ApplicantApplysService: ApplicantApplysService,
    public appSV: AppService,
    public EducationTypesService: EducationTypesService,
    
  ) { super()
    this.EducationTypesService.getAll().subscribe((x:any)=>{
      this.educationTypesData = x
    })
  }

  ngOnInit(): void {
    this.ApplicantApplysService.getAll().pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })
    ).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.totalData =  this.rows.length
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
  openPopUp() {
    const dialogRef = this.dialog.open(
      PopupInquireBranchesComponent, {
      width: '50%',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }

  search(){
    console.log(this.searchInput)
    this.ApplicantApplysService.getSearch(this.searchInput.search,'personal_id').pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })
    ).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.totalData =  this.rows.length
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
}
