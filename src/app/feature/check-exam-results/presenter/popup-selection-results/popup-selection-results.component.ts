import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupExamComponent } from 'src/app/feature/project-schedule/presenter/popup-exam/popup-exam.component';
import { AppService } from 'src/app/core/service/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-selection-results',
  templateUrl: './popup-selection-results.component.html',
  styleUrls: ['./popup-selection-results.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupSelectionResultsComponent extends BaseForm implements OnInit {
  check = true
  rows:any = []
  constructor(
    public dialogRef: MatDialogRef<PopupSelectionResultsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public FormBuilder: FormBuilder,
    public appSV: AppService,
    public dialog: MatDialog,
    public activeRoute: ActivatedRoute,
  ) {super(FormBuilder,activeRoute) }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close('close')
  }

}
