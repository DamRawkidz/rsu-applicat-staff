import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'document-type-form',
  templateUrl: './document-type-form.component.html',
  styleUrls: ['./document-type-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormComponent extends BaseForm implements OnInit {
  
  majorData = []
  facultyData = []
  examSubjectsData = []
  documentData = []
  programData = []
  schedulesCheck = false
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public DocumentTypesService: DocumentTypesService,
    public router: Router,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.DocumentTypesService.getAll().subscribe(x=>{
      this.documentData = x
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.DocumentTypesService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            document_type_id:res.document_type_id,
            document_type_code:res.document_type_code,
            document_type_name_en:res.document_type_name_en,
            document_type_name_th:res.document_type_name_th,
            status_id:res.status_id,
            create_by:res.create_by,
            create_date:res.create_date,
            last_update_by:res.last_update_by,
            last_update_date:res.last_update_date,          
          })
          let i = this.documentData.findIndex(x=>x.document_type_code == res.document_type_code)
          if(i != -1){
            this.documentData.splice(i,1)
          }
          
        })
        break;
      case 'add':
       
        break;
    }
  }
  save(){

    if(this.form.get('document_type_id').value != null){
      console.log(this.form.getRawValue())
      this.DocumentTypesService.update(this.form.get('document_type_id').value,this.form.getRawValue()).pipe(
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
        this.router.navigate(['app/document_type'])
      })
      
    }else{
      console.log(this.form.getRawValue())
      this.DocumentTypesService.add(this.form.getRawValue()).pipe(
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
        this.router.navigate(['app/document_type'])
      })
    }
   
  }
  close(){
    this.router.navigate(['app/document_type'])
  }
  createForm() {
    return this.baseFormBuilder.group({
      document_type_id: [null],
      document_type_code: [''],
      document_type_name_en: [''],
      document_type_name_th: [''],
      status_id: [null],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],

    })
  }
}