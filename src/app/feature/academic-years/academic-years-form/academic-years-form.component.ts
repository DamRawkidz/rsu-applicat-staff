import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';

@Component({
  selector: 'academic-years-form',
  templateUrl: './academic-years-form.component.html',
  styleUrls: ['./academic-years-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearsFormComponent extends BaseForm implements OnInit {
  yesrData = []
  constructor(public FormBuilder: FormBuilder,
    public AcademicYearService: AcademicYearService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public appSV: AppService,
  ) {
    super(FormBuilder, activeRoute)
    this.AcademicYearService.getAll().subscribe(x => {
      this.yesrData = x
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.AcademicYearService.getDate(this.id).subscribe((res: any) => {
          this.form.patchValue({
            academic_year_uid: res.academic_year_uid,
            academic_year_code: res.academic_year_code,
            academic_year_name_en: res.academic_year_name_en,
            academic_year_name_th: res.academic_year_name_th,
            status_id: res.status_id,
            create_by: res.create_by,
            create_date: res.create_date,
            last_update_by: res.last_update_by,
            last_update_date: res.last_update_date,
          })
          let i = this.yesrData.findIndex(x => x.academic_year_code == res.academic_year_code)
          console.log(i)
          if (i != -1) {
            this.yesrData.splice(i, 1)
          }
        })
        break;
      case 'add':

        break;
    }
  }
  close() {
    this.router.navigate(['app/academic_years'])
  }
  save() {
    if (this.form.get('academic_year_uid').value != null) {
        this.AcademicYearService.update(this.form.get('academic_year_uid').value, this.form.getRawValue()).pipe(
          catchError(err => {
            // alert ตรงนี่
            if(err.error.err == 400){
              this.appSV.swaltAlertError('', err.error.msg)
            }else{
              this.appSV.swaltAlertError('', 'Error')
            }
            return throwError(err)
          })).subscribe((x: any) => {
            console.log(x)
            // this.SubjectComponent.ngOnInit()
            this.router.navigate(['app/academic_years'])
            this.appSV.swaltAlert()

          })
    } else {
        this.AcademicYearService.add(this.form.getRawValue()).pipe(
          catchError(err => {
            // alert ตรงนี่
            if(err.error.err == 400){
              this.appSV.swaltAlertError('', err.error.msg)
            }else{
              this.appSV.swaltAlertError('', 'Error')
            }
            return throwError(err)
          })).subscribe((x: any) => {
            console.log(x)
            // this.SubjectComponent.ngOnInit()
            this.router.navigate(['app/academic_years'])
            this.appSV.swaltAlert()
          })
    }

  }
  createForm() {
    return this.baseFormBuilder.group({
      academic_year_uid: [null],
      academic_year_code: ['', [Validators.required]],
      academic_year_name_en: [''],
      academic_year_name_th: ['', [Validators.required]],
      status_id: [0],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}
