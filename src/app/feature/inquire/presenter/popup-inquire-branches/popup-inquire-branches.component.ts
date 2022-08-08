import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'popup-inquire-branches',
  templateUrl: './popup-inquire-branches.component.html',
  styleUrls: ['./popup-inquire-branches.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupInquireBranchesComponent implements OnInit {
  rows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  constructor(
    public dialogRef: MatDialogRef<PopupInquireBranchesComponent>,
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
