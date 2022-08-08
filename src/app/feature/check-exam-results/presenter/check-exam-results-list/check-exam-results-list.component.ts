import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupAnnounceComponent } from '../popup-announce/popup-announce.component';
import { PopupDetailScoreComponent } from '../popup-detail-score/popup-detail-score.component';
import { PopupListComponent } from '../popup-list/popup-list.component';
import { PopupSelectionResultsComponent } from '../popup-selection-results/popup-selection-results.component';

@Component({
  selector: 'check-exam-results-list',
  templateUrl: './check-exam-results-list.component.html',
  styleUrls: ['./check-exam-results-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckExamResultsListComponent implements OnInit {
  rows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  exam = false
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  openPopUpAnnounce(index) {
    const dialogRef = this.dialog.open(
      PopupAnnounceComponent, {
      width: '70%',
      height: '80vh',
      data: index  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
  openPopUpScoreDetail() {
    const dialogRef = this.dialog.open(
      PopupDetailScoreComponent, {
      width: '50%',
      height: '80vh',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
  openPopSelectionResilt() {
    const dialogRef = this.dialog.open(
      PopupSelectionResultsComponent, {
      width: '50%',
      height: '50vh',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
  openPopUpList() {
    const dialogRef = this.dialog.open(
      PopupListComponent, {
      width: '50%',
      height: '80vh',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
}
