import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupExamComponent } from 'src/app/feature/project-schedule/presenter/popup-exam/popup-exam.component';
import { AppService } from 'src/app/core/service/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-detail-score',
  templateUrl: './popup-detail-score.component.html',
  styleUrls: ['./popup-detail-score.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupDetailScoreComponent extends BaseForm implements OnInit {
  rows:any = []
  constructor(
    public dialogRef: MatDialogRef<PopupDetailScoreComponent>,
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
