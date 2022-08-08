import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'preview-doc',
  templateUrl: './preview-doc.component.html',
  styleUrls: ['./preview-doc.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewDocComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PreviewDocComponent>,
    @Inject(MAT_DIALOG_DATA) public urlDoc: string,
  ) { }
  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close([])
  }
}
