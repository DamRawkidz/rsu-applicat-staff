import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'popup-examinationfee',
  templateUrl: './popup-examinationfee.component.html',
  styleUrls: ['./popup-examinationfee.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupExaminationfeeComponent implements OnInit {
  rows:any = [
    {year:'xx',term:'xx',code:'xx',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  constructor(
    public dialogRef: MatDialogRef<PopupExaminationfeeComponent>,
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
