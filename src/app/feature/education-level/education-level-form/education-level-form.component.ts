import { Component, OnInit } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { EducationLevelsService } from 'src/app/core/service/education-levels.service';

@Component({
  selector: 'education-level-form',
  templateUrl: './education-level-form.component.html',
  styleUrls: ['./education-level-form.component.scss']
})
export class EducationLevelFormComponent extends BaseForm implements OnInit {
  
  majorData = []
  facultyData = []
  examSubjectsData = []
  documentData = []
  educationLevelData = []
  schedulesCheck = false
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public EducationLevelsService: EducationLevelsService,
    public router: Router,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.EducationLevelsService.getAll().subscribe(x=>{
      this.educationLevelData = x

    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.EducationLevelsService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            education_level_id:res.education_level_id,
            education_level_code:res.education_level_code,
            education_level_name_en:res.education_level_name_en,
            education_level_name_th:res.education_level_name_th,
            status_id:res.status_id,
            update_by:res.update_by,
            update_datetime:res.update_datetime,
            update_program:res.update_program,
            create_by:res.create_by,          
            create_datetime:res.create_datetime,          
            remark:res.remark,          
          })
          let i = this.educationLevelData.findIndex(x=>x.education_level_code == res.education_level_code)
          if(i != -1){
            this.educationLevelData.splice(i,1)
          }
          
        })
        break;
      case 'add':
       
        break;
    }
  }
  save(){

    if(this.form.get('education_level_id').value != null){
      console.log(this.form.getRawValue())
      this.EducationLevelsService.update(this.form.get('education_level_id').value,this.form.getRawValue()).pipe(
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
        this.appSV.swaltAlert()
        this.router.navigate(['app/education_level'])
      })
      
    }else{
      console.log(this.form.getRawValue())
      this.EducationLevelsService.add(this.form.getRawValue()).pipe(
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
        this.appSV.swaltAlert()
        this.router.navigate(['app/education_level'])
      })
    }
   
  }
  close(){
    this.router.navigate(['app/education_level'])
  }
  createForm() {
    return this.baseFormBuilder.group({
      education_level_id: [null],
      education_level_code: [''],
      education_level_name_en: [''],
      education_level_name_th: [''],
      status_id: [null],
      update_by: [''],
      update_datetime: [null],
      update_program: [''],
      create_by: [null],
      create_datetime: [null],
      remark: [null],

    })
  }
}