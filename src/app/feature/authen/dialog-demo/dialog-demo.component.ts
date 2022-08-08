import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDemoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDemoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

