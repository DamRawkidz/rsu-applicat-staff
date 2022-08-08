import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopupInquireBranchesComponent } from '../popup-inquire-branches/popup-inquire-branches.component';
import { MatDialog } from '@angular/material/dialog';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { MatTableDataSource } from '@angular/material/table';
import { BaseList } from 'src/app/core/base/base-list';
import { EducationTypesService } from 'src/app/core/service/education-types.service';

@Component({
  selector: 'inquire-list-data',
  templateUrl: './inquire-list-data.component.html',
  styleUrls: ['./inquire-list-data.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquireListDataComponent extends BaseList implements OnInit {
  rows:any = []
  educationTypesData:any = []
  constructor(
    public dialog: MatDialog,
    public ApplicantApplysService: ApplicantApplysService,
    public EducationTypesService: EducationTypesService,
    
  ) { super()
    this.EducationTypesService.getAll().subscribe((x:any)=>{
      this.educationTypesData = x
    })
  }

  ngOnInit(): void {
    this.ApplicantApplysService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
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
}
