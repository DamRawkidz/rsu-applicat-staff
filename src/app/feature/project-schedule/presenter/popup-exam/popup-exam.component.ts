import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/service/app.service';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'popup-exam',
  templateUrl: './popup-exam.component.html',
  styleUrls: ['./popup-exam.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupExamComponent extends BaseForm implements OnInit {
  rows:any = []
  constructor(
    public dialogRef: MatDialogRef<PopupExamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public appSV: AppService,
    public ExamSubjectsService: ExamSubjectsService,
    public dialog: MatDialog,
  ) {super(FormBuilder,activeRoute) }

  ngOnInit(): void {
    this.ExamSubjectsService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
    })
  }
  closeDialog() {
    this.dialogRef.close('close')
  }
  save(){
    if(this.form.get('exam_subject_id').value != null){
      this.ExamSubjectsService.update(this.form.get('exam_subject_id').value,this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          this.appSV.swaltAlertError('','Error')
          return throwError(err)
        })).subscribe((x:any)=>{
        console.log(x)
        this.ngOnInit()
          this.appSV.swaltAlert()
          
      })
    }else{
      this.ExamSubjectsService.add(this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          this.appSV.swaltAlertError('','Error')
          return throwError(err)
        })).subscribe((x:any)=>{
        console.log(x)
        this.ngOnInit()
          this.appSV.swaltAlert()
      })
    }
   
  }
  edit(id){
    this.ExamSubjectsService.getDate(id).subscribe((x:any)=>{
      this.form.patchValue({
        exam_subject_id: x.exam_subject_id,
        exam_subject_code: x.exam_subject_code,
        exam_subject_name_th: x.exam_subject_name_th,
      })
    })
  }
  del(i){
    this.ExamSubjectsService.deleteData(i).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('','Error')
        return throwError(err)
      })).subscribe((x:any)=>{
      console.log(x)
      this.ngOnInit()
        this.appSV.swaltAlert()
    })
  }
  createForm() {
    return this.baseFormBuilder.group({
      exam_subject_id: [null],
      exam_subject_code: ['', [Validators.required]],
      exam_subject_name_en: ['', [Validators.required]],
      exam_subject_name_th: [''],
      status_id: [0],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}
