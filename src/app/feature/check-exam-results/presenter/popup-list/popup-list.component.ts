import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupExamComponent } from 'src/app/feature/project-schedule/presenter/popup-exam/popup-exam.component';
import { AppService } from 'src/app/core/service/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-list',
  templateUrl: './popup-list.component.html',
  styleUrls: ['./popup-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupListComponent extends BaseForm implements OnInit {
  rows:any = [
    {code:'1159900255190',no:'0001',name:'ตัวอย่าง'}
  ]
  constructor(
    public dialogRef: MatDialogRef<PopupListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public FormBuilder: FormBuilder,
    public appSV: AppService,
    public activeRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {super(FormBuilder,activeRoute) }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close('close')
  }
}
