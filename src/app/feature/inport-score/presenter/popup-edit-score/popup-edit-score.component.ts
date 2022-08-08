import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'popup-edit-score',
  templateUrl: './popup-edit-score.component.html',
  styleUrls: ['./popup-edit-score.component.scss']
})
export class PopupEditScoreComponent implements OnInit {
  rows : any = []
  constructor(
    public dialogRef: MatDialogRef<PopupEditScoreComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
