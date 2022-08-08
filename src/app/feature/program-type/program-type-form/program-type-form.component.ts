import { Component, OnInit } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ProgramTypesService } from 'src/app/core/service/program-types.service';

@Component({
  selector: 'program-type-form',
  templateUrl: './program-type-form.component.html',
  styleUrls: ['./program-type-form.component.scss']
})
export class ProgramTypeFormComponent extends BaseForm implements OnInit {
  
  majorData = []
  facultyData = []
  examSubjectsData = []
  documentData = []
  programTypeData = []
  schedulesCheck = false
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public ProgramTypesService: ProgramTypesService,
    public router: Router,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.ProgramTypesService.getAll().subscribe(x=>{
      this.programTypeData = x

    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.ProgramTypesService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            program_type_id:res.program_type_id,
            program_type_code:res.program_type_code,
            program_type_name_en:res.program_type_name_en,
            program_type_name_th:res.program_type_name_th,
            status_id:res.status_id,
            create_by:res.create_by,
            create_date:res.create_date,
            last_update_by:res.last_update_by,
            last_update_date:res.last_update_date,          
          })
          let i = this.programTypeData.findIndex(x=>x.program_type_code == res.program_type_code)
          if(i != -1){
            this.programTypeData.splice(i,1)
          }
          
        })
        break;
      case 'add':
       
        break;
    }
  }
  save(){

    if(this.form.get('program_type_id').value != null){
      console.log(this.form.getRawValue())
      this.ProgramTypesService.update(this.form.get('program_type_id').value,this.form.getRawValue()).pipe(
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
        this.router.navigate(['app/program_type'])
      })
      
    }else{
      console.log(this.form.getRawValue())
      this.ProgramTypesService.add(this.form.getRawValue()).pipe(
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
        this.router.navigate(['app/program_type'])
      })
    }
   
  }
  close(){
    this.router.navigate(['app/program_type'])
  }
  createForm() {
    return this.baseFormBuilder.group({
      program_type_id: [null],
      program_type_code: [''],
      program_type_name_en: [''],
      program_type_name_th: [''],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}