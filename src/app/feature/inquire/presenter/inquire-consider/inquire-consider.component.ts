import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopupInquireBranchesComponent } from '../popup-inquire-branches/popup-inquire-branches.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'inquire-consider',
  templateUrl: './inquire-consider.component.html',
  styleUrls: ['./inquire-consider.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquireConsiderComponent implements OnInit {
  rows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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
