import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {
  @Input() title:string = 'Loading...'
  @Input() colorText:string = ''  
  constructor(
    public dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
