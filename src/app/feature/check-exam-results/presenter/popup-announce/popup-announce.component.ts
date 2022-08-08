import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupExamComponent } from 'src/app/feature/project-schedule/presenter/popup-exam/popup-exam.component';
import { AppService } from 'src/app/core/service/app.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-announce',
  templateUrl: './popup-announce.component.html',
  styleUrls: ['./popup-announce.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupAnnounceComponent extends BaseForm implements OnInit {
  rows:any = []
  constructor(
    public dialogRef: MatDialogRef<PopupAnnounceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public FormBuilder: FormBuilder,
    public appSV: AppService,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
  ) {super(FormBuilder,activeRoute) }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close('close')
  }
  gotoReport(){
    if(this.data == 1){
      this.gotoReport1Page()
      this.dialogRef.close('close')
    }else{
      this.gotoReport2Page()
      this.dialogRef.close('close')
    }
  }
  gotoReport1Page(){
    this.router.navigate(['app/check-exam-results/report1'])
  }
  gotoReport2Page(){
    this.router.navigate(['app/check-exam-results/report2'])
  }
}
