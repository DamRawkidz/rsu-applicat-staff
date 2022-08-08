import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'popup-interview',
  templateUrl: './popup-interview.component.html',
  styleUrls: ['./popup-interview.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupInterviewComponent implements OnInit {
  rows:any = [
    {year:'xx',term:'xx',code:'xx',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  constructor(
    public dialogRef: MatDialogRef<PopupInterviewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  closeDialog() {
    this.dialogRef.close('close')
  }
}
