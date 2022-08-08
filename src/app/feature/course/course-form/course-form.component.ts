import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BaseForm } from 'src/app/core/base/base-form';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/core/service/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormArray, FormBuilder } from '@angular/forms';
import { PopupExamComponent } from '../../project-schedule/presenter/popup-exam/popup-exam.component';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { MajorService } from 'src/app/core/service/major.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { CourseService } from 'src/app/core/service/course.service';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent extends BaseForm implements OnInit {
  interviews = {
    course_interview_exam_id: null,
    course_id: null,
    course_interview_exam_code: '',
    course_interview_exam_name_en: '',
    course_interview_exam_name_th: '',
    status_id: 0,
    create_by: 0,
    create_date: null,
    last_update_by: 0,
    last_update_date: null,
  }
  writtens = {
    course_written_exam_id: null,
    course_id: null,
    row_order: 0,
    exam_subject_id: 0,
    subjective_score: 0,
    objective_score: 0,
    total_score: 0,
    pass_score: 0,
    status_id: 0,
    create_by: 0,
    create_date: null,
    last_update_by: 0,
    last_update_date: null,
  }
  majorData = []
  facultyData = []
  examSubjectsData = []
  documentData = []
  programData = []
  emailTemplateData = []
  schedulesCheck = false
  constructor(public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public FacultyService: FacultyService,
    public MajorService: MajorService,
    public ProgramsService: ProgramsService,
    public EmailTemplateService: EmailTemplateService,
    public router: Router,
    public ExamSubjectsService: ExamSubjectsService,
    public DocumentTypesService: DocumentTypesService,
    public CourseService: CourseService,
    public appSV: AppService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.ProgramsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.programData = x
    })
    this.EmailTemplateService.getAll().subscribe((x: any) => {
      console.log(x)
      this.emailTemplateData = x
    })
    this.DocumentTypesService.getAll().subscribe((x: any) => {
      console.log(x)
      this.documentData = x.map(x=>{
        return {...x,isCheck:false}
      })
    })
    // this.FacultyService.getAll().subscribe((x: any) => {
    //   console.log(x)
    //   this.facultyData = x
    // })
    // this.MajorService.getAll().subscribe((x: any) => {
    //   console.log(x)
    //   this.majorData = x
    // })
    this.ExamSubjectsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.examSubjectsData = x
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        this.CourseService.getDate(this.id).subscribe((res: any) => {
          console.log(res)
          this.form.patchValue({
            course_id:res.course_id,
            course_code:res.course_code,
            course_name_en:res.course_name_en,
            course_name_th:res.course_name_th,
            program_id:res.program_id,
            faculty_id:res.faculty_id,
            major_id:res.major_id,
            application_check_flag:res.application_check_flag,
            interview_exam_flag:res.interview_exam_flag,
            interview_exam_price:res.interview_exam_price,
            practical_exam_flag:res.practical_exam_flag,
            practical_exam_price:res.practical_exam_price,
            written_exam_flag:res.written_exam_flag,
            written_exam_price:res.written_exam_price,
            email_template_id:res.email_template_id,
            program_document_flag:res.program_document_flag,
            status_id:res.status_id,
            create_by:res.create_by,
            create_date:res.create_date,
            last_update_by:res.last_update_by,
            last_update_date:res.last_update_date,          
          })
          if(res.schedules){
            res.schedules.forEach((schedules) => {
              let itemsArray = this.form.get('schedules') as FormArray
              itemsArray.push(this.schedulesForm(schedules))
          })
          }
          if(res.documents){
            res.documents.forEach((documents) => {
              let itemsArray = this.form.get('documents') as FormArray
              itemsArray.push(this.documentForm(documents))
              console.log(documents.document_type_id)
              // this.documentData.forEach(x=>{
              //   console.log(x.document_type_id)
              //   console.log(x.document_type_id == documents.document_type_id)
              //   if(x.document_type_id == documents.document_type_id){
              //     x.isCheck = true
              //   }else{
              //     x.isCheck = false
              //   }
              // })
              
          })
          }
          console.log(this.documentData)
        })
        break;
      case 'add':
       
        break;
    }
  }
  save(){
    if(this.form.get('course_id').value != null){
      const schedules =  this.form.get('schedules') as FormArray
      schedules.controls.forEach(element => {
        let apply_start_date = new Date(element.get('apply_start_date').value)
          apply_start_date.setHours(+7)
          element.get('apply_start_date').setValue(apply_start_date)
        let apply_end_date = new Date(element.get('apply_end_date').value)
        apply_end_date.setHours(+7)
          element.get('apply_end_date').setValue(apply_end_date)
        let written_exam_start_date = new Date(element.get('written_exam_start_date').value)
        written_exam_start_date.setHours(+7)
          element.get('written_exam_start_date').setValue(written_exam_start_date)
        let written_exam_end_date = new Date(element.get('written_exam_end_date').value)
        written_exam_end_date.setHours(+7)
          element.get('written_exam_end_date').setValue(written_exam_end_date)
        let interview_exam_start_date = new Date(element.get('interview_exam_start_date').value)
        interview_exam_start_date.setHours(+7)
          element.get('interview_exam_start_date').setValue(interview_exam_start_date)
        let interview_exam_end_date = new Date(element.get('interview_exam_end_date').value)
        interview_exam_end_date.setHours(+7)
          element.get('interview_exam_end_date').setValue(interview_exam_end_date)
        let enrollment_start_date = new Date(element.get('enrollment_start_date').value)
        enrollment_start_date.setHours(+7)
          element.get('enrollment_start_date').setValue(enrollment_start_date)
        let enrollment_end_date = new Date(element.get('enrollment_end_date').value)
        enrollment_end_date.setHours(+7)
          element.get('enrollment_end_date').setValue(enrollment_end_date)
  
          element.get('program_id').setValue(this.form.get('program_id').value)
      });
      console.log(this.form.getRawValue())
      this.CourseService.update(this.form.get('course_id').value,this.form.getRawValue()).pipe(
      catchError(err => {
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe((x: any) => {
        console.log(x)
        this.appSV.swaltAlert()
        this.router.navigate(['app/course'])
      })
      
    }else{
      const schedules =  this.form.get('schedules') as FormArray
      schedules.controls.forEach(element => {
        let apply_start_date = new Date(element.get('apply_start_date').value)
          apply_start_date.setHours(+7)
          element.get('apply_start_date').setValue(apply_start_date)
        let apply_end_date = new Date(element.get('apply_end_date').value)
        apply_end_date.setHours(+7)
          element.get('apply_end_date').setValue(apply_end_date)
        let written_exam_start_date = new Date(element.get('written_exam_start_date').value)
        written_exam_start_date.setHours(+7)
          element.get('written_exam_start_date').setValue(written_exam_start_date)
        let written_exam_end_date = new Date(element.get('written_exam_end_date').value)
        written_exam_end_date.setHours(+7)
          element.get('written_exam_end_date').setValue(written_exam_end_date)
        let interview_exam_start_date = new Date(element.get('interview_exam_start_date').value)
        interview_exam_start_date.setHours(+7)
          element.get('interview_exam_start_date').setValue(interview_exam_start_date)
        let interview_exam_end_date = new Date(element.get('interview_exam_end_date').value)
        interview_exam_end_date.setHours(+7)
          element.get('interview_exam_end_date').setValue(interview_exam_end_date)
        let enrollment_start_date = new Date(element.get('enrollment_start_date').value)
        enrollment_start_date.setHours(+7)
          element.get('enrollment_start_date').setValue(enrollment_start_date)
        let enrollment_end_date = new Date(element.get('enrollment_end_date').value)
        enrollment_end_date.setHours(+7)
          element.get('enrollment_end_date').setValue(enrollment_end_date)
  
          element.get('program_id').setValue(this.form.get('program_id').value)
      });
      console.log(this.form.getRawValue())
      this.CourseService.add(this.form.getRawValue()).pipe(
      catchError(err => {
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe((x: any) => {
        console.log(x)
        this.appSV.swaltAlert()
        this.router.navigate(['app/course'])
      })
      
    }

    
  }
  addDocument(value,data){
    console.log(value)
    console.log(data)
    if(value){
      (<FormArray>this.form.get('documents')).push(this.documentForm({document_type_id:data.document_type_id}))
    }else{
      let i = this.form.value.documents.findIndex(x=>x.document_type_id == data.document_type_id)
      console.log(i);
      if(i != -1){
        let formDoc = this.form.get('documents') as FormArray
        formDoc.removeAt(i)
      }
    }
  }
  checkDocument(data){
    let formDoc = this.form.get('documents') as FormArray
    formDoc.controls.forEach(x=>{
      if(x.get('document_type_id').value == data.document_type_id){
        data.isCheck = true
      }else{
        data.isCheck = false
      }
    })
  }
  addschedules(value){
    if(value){
      const schedules =  this.form.get('schedules') as FormArray
      while(schedules.length != 0){
        schedules.removeAt(0)
      }
        this.ProgramsService.getDate(this.form.get('program_id').value).subscribe((x:any)=>{
          console.log(x);
          x.schedules.forEach(element => {
            (<FormArray>this.form.get('schedules')).push(this.schedulesProgramForm(element))
          });
        })
    }else{
      const schedules =  this.form.get('schedules') as FormArray
      while(schedules.length != 0){
        schedules.removeAt(0)
      }
    }
  }
  delschedulesForm(i){
    (<FormArray>this.form.get('schedules')).removeAt(i)
  }
  addschedulesForm() {
    (<FormArray>this.form.get('schedules')).push(this.schedulesForm())
  }
  close(){
    this.router.navigate(['app/course'])
    
  }
    openPopUp() {
    const dialogRef = this.dialog.open(
      PopupExamComponent, {
      width: '80%',
      data: '' // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
  changeFaculty(data){
    console.log(data)
    let item = this.programData.find(x=>x.program_id == data)
    console.log(item)
    this.FacultyService.getSearch(item.education_type_code,'education_type_code').subscribe((x:any)=>{
      console.log(x)
      this.facultyData = x
    })
  }
  changeMajor(data){
    console.log(data)
    let item = this.facultyData.find(x=>x.faculty_code == data)
    console.log(item)
    this.MajorService.getSearchToStr(item.faculty_code,'faculty_code',item.education_type_code,'education_type_code').subscribe((x:any)=>{
      console.log(x)
      this.majorData = x
    })
  }
  
  schedulesForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        course_schedule_id: [0],
        course_id: [null],
        program_id: [null],
        program_schedule_code: [''],
        program_schedule_name_en: [''],
        program_schedule_name_th: [''],
        apply_start_date: [null],
        apply_end_date: [null],
        written_exam_start_date: [null],
        written_exam_end_date: [null],
        interview_exam_start_date: [null],
        interview_exam_end_date: [null],
        enrollment_start_date: [null],
        enrollment_end_date: [null],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        course_schedule_id:element.course_schedule_id,
        course_id:element.course_id,
        program_id:element.program_id,
        program_schedule_code:element.program_schedule_code,
        program_schedule_name_en:element.program_schedule_name_en,
        program_schedule_name_th:element.program_schedule_name_th,
        apply_start_date:element.apply_start_date,
        apply_end_date:element.apply_end_date,
        written_exam_start_date:element.written_exam_start_date,
        written_exam_end_date:element.written_exam_end_date,
        interview_exam_start_date:element.interview_exam_start_date,
        interview_exam_end_date:element.interview_exam_end_date,
        enrollment_start_date:element.enrollment_start_date,
        enrollment_end_date:element.enrollment_end_date,
        status_id:element.status_id,
        create_by:element.create_by,
        create_date:element.create_date,
        last_update_by:element.last_update_by,
        last_update_date:element.last_update_date
      })
    }
  }
  schedulesProgramForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        course_schedule_id: [0],
        course_id: [0],
        program_id: [0],
        program_schedule_code: [''],
        program_schedule_name_en: [''],
        program_schedule_name_th: [''],
        apply_start_date: [null],
        apply_end_date: [null],
        written_exam_start_date: [null],
        written_exam_end_date: [null],
        interview_exam_start_date: [null],
        interview_exam_end_date: [null],
        enrollment_start_date: [null],
        enrollment_end_date: [null],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        course_schedule_id:element.course_schedule_id,
        course_id:element.course_id,
        program_id:element.program_id,
        program_schedule_code:element.program_schedule_code,
        program_schedule_name_en:element.program_schedule_name_en,
        program_schedule_name_th:element.program_schedule_name_th,
        apply_start_date:element.apply_start_date,
        apply_end_date:element.apply_end_date,
        written_exam_start_date:element.written_exam_start_date,
        written_exam_end_date:element.written_exam_end_date,
        interview_exam_start_date:element.interview_exam_start_date,
        interview_exam_end_date:element.interview_exam_end_date,
        enrollment_start_date:element.enrollment_start_date,
        enrollment_end_date:element.enrollment_end_date,
        status_id:element.status_id,
        create_by:element.create_by,
        create_date:element.create_date,
        last_update_by:element.last_update_by,
        last_update_date:element.last_update_date
      })
    }
  }
  documentForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
      course_document_id: [0],
      course_id: [0],
      row_order: [0],
      document_type_id: [0],
      status_id: [0],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
      course_document_id:element.course_document_id,
      course_id:element.course_id,
      row_order:element.row_order,
      document_type_id:element.document_type_id,
      status_id:element.status_id,
      create_by:element.create_by,
      create_date:element.create_date,
      last_update_by:element.last_update_by,
      last_update_date:element.last_update_date
      })
    }
  }
  createForm() {
    return this.baseFormBuilder.group({
      course_id: [null],
      course_code: [''],
      course_name_en: [''],
      course_name_th: [''],
      program_id: [null],
      faculty_id: [null],
      faculty_code: [''],
      major_id: [null],
      major_code: [''],
      application_check_flag: [true],
      interview_exam_flag: [true],
      interview_exam_price: [0],
      practical_exam_flag: [true],
      practical_exam_price: [0],
      written_exam_flag: [true],
      written_exam_price: [0],
      email_template_id: [null],
      program_document_flag: [true],
      status_id: [0],
      create_by: [null],
      create_date: [null],
      last_update_by: [null],
      last_update_date: [null],
      schedules: this.baseFormBuilder.array([]),
      documents: this.baseFormBuilder.array([]),

    })
  }
}
