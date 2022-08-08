import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';

@Component({
  selector: 'academic-semesters-form',
  templateUrl: './academic-semesters-form.component.html',
  styleUrls: ['./academic-semesters-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicSemestersFormComponent extends BaseForm implements OnInit {
  academicYear = []
  semesterData = []
  constructor(public FormBuilder: FormBuilder,
    public AcademicYearService: AcademicYearService,
    public AcademicSemesterService: AcademicSemesterService,
    public router:Router,
    public activeRoute: ActivatedRoute,
    public appSV: AppService,
  ) { super(FormBuilder, activeRoute) 
    this.AcademicYearService.getAll().subscribe(x=>{
      this.academicYear = x
    })
    this.AcademicSemesterService.getAll().subscribe(x=>{
      this.semesterData = x

    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.AcademicSemesterService.getDate(this.id).subscribe((res: any) => {
          this.form.patchValue({
            academic_year_uid: res.academic_year_uid,
            academic_semester_uid: res.academic_semester_uid,
            academic_semester_code: res.academic_semester_code,
            academic_semester_name_en: res.academic_semester_name_en,
            academic_semester_name_th: res.academic_semester_name_th,
            status_id: res.status_id,
            create_by: res.create_by,
            create_date: res.create_date,
            last_update_by: res.last_update_by,
            last_update_date: res.last_update_date,
          })
          let i = this.semesterData.findIndex(x=>x.academic_semester_code == res.academic_semester_code)
          if(i != -1){
            this.semesterData.splice(i,1)
          }
        })
        break;
      case 'add':

        break;
    }
  }
  close(){
    this.router.navigate(['app/academic_semesters'])
  }
  save() {
    if (this.form.get('academic_semester_uid').value != null) {
      this.AcademicSemesterService.update(this.form.get('academic_semester_uid').value, this.form.getRawValue()).pipe(
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
          this.router.navigate(['app/academic_semesters'])
          this.appSV.swaltAlert()

        })
    } else {
      this.AcademicSemesterService.add(this.form.getRawValue()).pipe(
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
          this.router.navigate(['app/academic_semesters'])
          this.appSV.swaltAlert()
        })
    }

  }
  createForm() {
    return this.baseFormBuilder.group({
      academic_year_uid: [null, [Validators.required]],
      academic_semester_uid: [null],
      academic_semester_code: [''],
      academic_semester_name_en: ['', [Validators.required]],
      academic_semester_name_th: [''],
      status_id: [0],
      create_by: [0],
      create_date: [null],
      last_update_by: [0],
      last_update_date: [null],

    })
  }
}
