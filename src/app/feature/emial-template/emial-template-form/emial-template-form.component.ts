import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';

@Component({
  selector: 'emial-template-form',
  templateUrl: './emial-template-form.component.html',
  styleUrls: ['./emial-template-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmialTemplateFormComponent extends BaseForm implements OnInit {

  mailData = []
  schedulesCheck = false
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public EmailTemplateService: EmailTemplateService,
    public router: Router,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.EmailTemplateService.getAll().subscribe(x => {
      this.mailData = x

    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.EmailTemplateService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            email_template_id: res.email_template_id,
            email_template_code: res.email_template_code,
            email_template_name_th: res.email_template_name_th,
            email_template_name_en: res.email_template_name_en,
            type: res.type,
            subject: res.subject,
            html_message: res.html_message,
            status_id: res.status_id,
            create_by: res.create_by,
            create_date: res.create_date,
            last_update_by: res.last_update_by,
            last_update_date: res.last_update_date,
          })
          let i = this.mailData.findIndex(x => x.email_template_code == res.email_template_code)
          if (i != -1) {
            this.mailData.splice(i, 1)
          }

        })
        break;
      case 'add':

        break;
    }
  }
  save() {

    if (this.form.get('email_template_id').value != null) {
      console.log(this.form.getRawValue())
      this.EmailTemplateService.update(this.form.get('email_template_id').value, this.form.getRawValue()).pipe(
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
          this.appSV.swaltAlert()
          this.router.navigate(['app/email-template'])
        })
    } else {
      console.log(this.form.getRawValue())
      this.EmailTemplateService.add(this.form.getRawValue()).pipe(
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
          this.appSV.swaltAlert()
          this.router.navigate(['app/email-template'])
        })
    }

  }
  close() {
    this.router.navigate(['app/email-template'])
  }
  createForm() {
    return this.baseFormBuilder.group({
      email_template_id: [null],
      email_template_code: [''],
      email_template_name_th: [''],
      email_template_name_en: [''],
      type: [''],
      subject: [''],
      html_message: [''],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}
