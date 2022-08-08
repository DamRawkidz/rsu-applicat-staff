import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { AppService } from 'src/app/core/service/app.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectAddComponent extends BaseForm implements OnInit {
  subjectData = []
  constructor(public FormBuilder: FormBuilder,
    public ExamSubjectsService: ExamSubjectsService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public appSV: AppService,
  ) {
    super(FormBuilder, activeRoute)
    this.ExamSubjectsService.getAll().subscribe(x => {
      this.subjectData = x

    })


  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.ExamSubjectsService.getDate(this.id).subscribe((res: any) => {
          this.form.patchValue({
            exam_subject_id: res.exam_subject_id,
            exam_subject_code: res.exam_subject_code,
            exam_subject_name_en: res.exam_subject_name_en,
            exam_subject_name_th: res.exam_subject_name_th,
            status_id: res.status_id,
            create_by: res.create_by,
            create_date: res.create_date,
            last_update_by: res.last_update_by,
            last_update_date: res.last_update_date,
          })
          let i = this.subjectData.findIndex(x => x.exam_subject_code == res.exam_subject_code)
          if (i != -1) {
            this.subjectData.splice(i, 1)
          }
        })
        break;
      case 'add':

        break;
    }
  }
  close() {
    this.router.navigate(['app/subject'])
  }
  save() {
    if (this.form.get('exam_subject_id').value != null) {
      this.ExamSubjectsService.update(this.form.get('exam_subject_id').value, this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          if (err.error.err == 400) {
            this.appSV.swaltAlertError('', err.error.msg)
          } else {
            this.appSV.swaltAlertError('', 'Error')
          }
          return throwError(err)
        })).subscribe((x: any) => {
          console.log(x)
          // this.SubjectComponent.ngOnInit()
          this.router.navigate(['app/subject'])
          this.appSV.swaltAlert()

        })
    } else {
      this.ExamSubjectsService.add(this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          if (err.error.err == 400) {
            this.appSV.swaltAlertError('', err.error.msg)
          } else {
            this.appSV.swaltAlertError('', 'Error')
          }
          return throwError(err)
        })).subscribe((x: any) => {
          console.log(x)
          // this.SubjectComponent.ngOnInit()
          this.router.navigate(['app/subject'])
          this.appSV.swaltAlert()
        })
    }
  }
  createForm() {
    return this.baseFormBuilder.group({
      exam_subject_id: [null],
      exam_subject_code: ['', [Validators.required]],
      exam_subject_name_en: [''],
      exam_subject_name_th: ['', [Validators.required]],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}
