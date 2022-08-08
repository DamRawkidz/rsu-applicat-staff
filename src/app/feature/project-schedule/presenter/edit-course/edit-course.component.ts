import { Component, OnInit, ChangeDetectionStrategy, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupExamComponent } from '../popup-exam/popup-exam.component';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import swal from 'sweetalert2'
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import * as moment from 'moment';
import { ProgramCouresService } from 'src/app/core/service/program-coures.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCourseComponent extends BaseForm implements OnInit,AfterViewInit {
  formC = {
    program_course_id: null,
    program_schedule_id: null,
    program_id: null,
    course_code: '',
    validate_flag: false,
    written_flag: false,
    interview_flag: false,
    practice_flag: false,
    written_price: 0,
    interview_price: 0,
    practical_price: 0,
    document_flag: true,
    schedule_flag: true,
    is_flag: false,
    validate_by_id: 0,
    status_id: 0,
    create_by: null,
    create_date: null,
    parent_schedule_id: null,
    // use_parent_schedule: true,
    last_update_by: null,
    last_update_date: null,
    courseDocuments: [],
    courseSchedules: [],
    courseActions: []
  }
  actionsForm = {
    program_apply_action_id: null,
    program_id: null,
    program_course_id: null,
    application_status_id: null,
    action_type_id: null,
    action_template_id: null
  }
  actionsArray = []
  documentArray = []
  documentForm = {
    program_document_id: null,
    program_id: null,
    program_course_id: null,
    row_order: 0,
    document_type_id: null,
    status_id: 0,
    create_by: null,
    create_date: null,
    last_update_by: null,
    last_update_date: null
  }
  documentData = []
  applicationStatusData = []
  emailTamplateData = []
  scheduleArray = []
  scheduleFrom = {
    program_schedule_id: null,
    program_id: null,
    course_id: null,
    program_course_id: null,
    program_schedule_code: '',
    program_schedule_name_en: '',
    program_schedule_name_th: '',
    apply_start_date: null,
    apply_end_date: null,
    written_exam_start_date: null,
    written_exam_end_date: null,
    interview_exam_start_date: null,
    interview_exam_end_date: null,
    enrollment_start_date: null,
    enrollment_end_date: null,
    parent_schedule_id: null,
    // use_parent_schedule: true,
    start_time: '',
    end_time: '',
    status_id: 0,
    validate_by_id: 0,
    create_by: null,
    create_date: null,
    last_update_by: null,
    last_update_date: null,
    writtenExamRooms: [],
    writtenExamResults: [],
    programCourseScheduleExams: []

  }
  examSubjectsData = []
  isScore = false
  constructor(
    public dialogRef: MatDialogRef<PopupExamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialog: MatDialog,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public ApplicationStatusService: ApplicationStatusService,
    public ExamSubjectsService: ExamSubjectsService,
    public EmailTemplateService: EmailTemplateService,
    public DocumentTypesService: DocumentTypesService,
    public ProgramCouresService: ProgramCouresService,
  ) {
    super(FormBuilder, activeRoute)
   
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.program)
    console.log(this.data.course[0].value.program_course_id)
    if (this.data.course.length == 1) {



      if(this.data.course[0].value.program_course_id == null){


            let element = this.data.course[0].value
            console.log(element)
            this.formC = {
              program_schedule_id: element.program_schedule_id,
              program_course_id: element.program_course_id,
              program_id: element.program_id,
              validate_by_id: element.validate_by_id,
              course_code: element.course_code,
              validate_flag: element.validate_flag,
              written_flag: element.written_flag,
              interview_flag: element.interview_flag,
              practice_flag: element.practice_flag,
              written_price: element.written_price,
              interview_price: element.interview_price,
              practical_price: element.practical_price,
              document_flag: element.document_flag,
              schedule_flag: element.schedule_flag,
              is_flag: element.is_flag,
              status_id: element.status_id,
              create_by: element.create_by,
              create_date: element.create_date,
              last_update_by: element.last_update_by,
              last_update_date: element.last_update_date,
              parent_schedule_id: this.data.program.schedules[0].program_schedule_id ,
              // use_parent_schedule: element.value.use_parent_schedule,
              courseDocuments: [],
              courseSchedules: [],
              courseActions:[]
            }
            this.actionsArray = element.courseActions
            this.documentArray = element.courseDocuments
            element.courseSchedules.forEach((courseSchedule,indexcourseSchedule) => {
              (<FormArray>this.form.get('courseSchedules')).push(this.schedulesCourseForm(courseSchedule));
              courseSchedule.programCourseScheduleExams.forEach((programCourseScheduleExams,indexprogramCourseScheduleExams) => {
                (<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[indexcourseSchedule].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course(programCourseScheduleExams));
                if(programCourseScheduleExams.programCourseScheduleExamSubjects){
                  programCourseScheduleExams.programCourseScheduleExamSubjects.forEach(programCourseScheduleExamSubjects => {
                    this.isScore = true;
                    (<FormArray>(<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[indexcourseSchedule].get('programCourseScheduleExams')).controls[indexprogramCourseScheduleExams].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjects_course(programCourseScheduleExamSubjects));
                  });
                }
                
              });
    
            });





      }else{
        this.ProgramCouresService.getDate(this.data.course[0].value.program_course_id).pipe(
          tap((element:any)=>{
            console.log(element)
            this.formC = {
              program_schedule_id: element.program_schedule_id,
              program_course_id: element.program_course_id,
              program_id: element.program_id,
              validate_by_id: element.validate_by_id,
              course_code: element.course_code,
              validate_flag: element.validate_flag,
              written_flag: element.written_flag,
              interview_flag: element.interview_flag,
              practice_flag: element.practice_flag,
              written_price: element.written_price,
              interview_price: element.interview_price,
              practical_price: element.practical_price,
              document_flag: element.document_flag,
              schedule_flag: element.schedule_flag,
              is_flag: element.is_flag,
              status_id: element.status_id,
              create_by: element.create_by,
              create_date: element.create_date,
              last_update_by: element.last_update_by,
              last_update_date: element.last_update_date,
              parent_schedule_id: this.data.program.schedules[0].program_schedule_id ,
              // use_parent_schedule: element.value.use_parent_schedule,
              courseDocuments: [],
              courseSchedules: [],
              courseActions:[]
            }
            this.actionsArray = element.courseActions
            this.documentArray = element.courseDocuments
            element.courseSchedules.forEach((courseSchedule,indexcourseSchedule) => {
              (<FormArray>this.form.get('courseSchedules')).push(this.schedulesCourseForm(courseSchedule));
              courseSchedule.programCourseScheduleExams.forEach((programCourseScheduleExams,indexprogramCourseScheduleExams) => {
                (<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[indexcourseSchedule].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course(programCourseScheduleExams));
                if(programCourseScheduleExams.programCourseScheduleExamSubjects){
                  programCourseScheduleExams.programCourseScheduleExamSubjects.forEach(programCourseScheduleExamSubjects => {
                    this.isScore = true;
                    (<FormArray>(<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[indexcourseSchedule].get('programCourseScheduleExams')).controls[indexprogramCourseScheduleExams].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjects_course(programCourseScheduleExamSubjects));
                  });
                }
                
              });
    
            });
          })
        ).subscribe()
      }
      this.data.course.forEach(element => {
        console.log(element)
       

      });

    }
    this.DocumentTypesService.getAll().subscribe((x: any) => {
      console.log(x)
      this.documentData = x.map(x => {
        return { ...x, isCheck: false }
      })
    })
    this.ExamSubjectsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.examSubjectsData = x
    })
    this.ApplicationStatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.applicationStatusData = x
    })
    this.EmailTemplateService.getAll().subscribe((x: any) => {
      console.log(x)
      this.emailTamplateData = x
    })
  }
  change_written_flag(check){
    console.log(check.value)
    if(check.value){
      console.log(this.data.program.schedules)
      this.formC.schedule_flag = false
      this.data.program.schedules.forEach((element,i) => {
        console.log(element);
        (<FormArray>this.form.get('courseSchedules')).push(this.addschedulesCourseForm(element));        
        (<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[i].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course());        
        this.data.program.programExamSubjects.forEach((programExamSubjects,iprogramExamSubjects) => {
          console.log(programExamSubjects);     
          (<FormArray>(<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[i].get('programCourseScheduleExams')).controls[i].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjects_course(programExamSubjects));        
        });
      });

      ;
    }else{
      
    }
  }
  change_interview_practice_flag(check){
    console.log(check.value)
    if(check.value){
     this.formC.practice_flag = check.value
    }else{
    this.formC.practice_flag = check.value
    }
  }
  dateChange(form,date: moment.Moment,text){
    form.get(`${text}`).setValue(moment(date).add(7,'hours').toDate())
    // let todayDate = moment()
    // let calculateAge = todayDate.diff(date,'years')
    // // this.form.get('age').setValue(calculateAge)
    // this.age.nativeElement.value = calculateAge.toString()
    // console.log(calculateAge)
    
  }
  addActionForm(){
    if(this.actionsForm.application_status_id == null){
      swal.fire({
        icon: 'warning',
        text: 'กรุณาเลือกสถานะ'
      })
    }else if(this.actionsForm.action_template_id == null){
      swal.fire({
        icon: 'warning',
        text: 'กรุณาเลือกเทมเพลตอีเมล'
      })
    }else{
      this.actionsArray.push(this.actionsForm)
      this.actionsForm = {
        program_apply_action_id: null,
        program_id: null,
        program_course_id: null,
        application_status_id: null,
        action_type_id: null,
        action_template_id: null
      }
    }
    
  }
  delActionForm(i){
    this.actionsArray.splice(i,1)
  }
  addDocument(value, data) {
    console.log(value)
    console.log(data)
    if (value) {
      this.documentForm.document_type_id = data.document_type_id
      this.documentArray.push(this.documentForm)
    } else {
      let i = this.documentArray.findIndex(x => x.document_type_id == data.document_type_id)
      console.log(i);
      if (i != -1) {
        this.documentArray.splice(i, 1)
      }
    }
  }
  addschedulesForm() {
    // this.scheduleArray.push(this.scheduleFrom)
    // console.log(this.scheduleArray);
    // (<FormArray>this.form.get('courseSchedules')).push(this.schedulesCourseForm())
    this.data.program.schedules.forEach((element,i) => {
      console.log(element);
      (<FormArray>this.form.get('courseSchedules')).push(this.addschedulesCourseForm(element));        
      (<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[i].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course());        
      this.data.program.programExamSubjects.forEach((programExamSubjects,iprogramExamSubjects) => {
        console.log(programExamSubjects);     
        (<FormArray>(<FormArray>(<FormArray>this.form.get('courseSchedules')).controls[i].get('programCourseScheduleExams')).controls[i].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjects_course(programExamSubjects));        
      });
    });
  }
  delschedulesForm(i) {
    const schedules = this.form.get('courseSchedules') as FormArray
    schedules.removeAt(i)
  }
  save() {
    this.dialogRef.close({ document: this.documentArray, schedule: this.form.value.courseSchedules, course: this.formC ,action: this.actionsArray})
  }
  close() {
    this.dialogRef.close({ document: [], schedule: [], course: null ,action:[]})
  }
  programCourseScheduleExamsForm_course(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_course_schedule_exam_id: [null],
        program_schedule_id: [null],
        is_join: [true],
        interview_amount: [0],
        require_total_score: [0],
        programCourseScheduleExamSubjects: this.baseFormBuilder.array([]),
        
      })
    } else {
      return this.FormBuilder.group({
        program_course_schedule_exam_id: element.program_course_schedule_exam_id,
        program_schedule_id: element.program_schedule_id,
        is_join: element.is_join,
        interview_amount: element.interview_amount,
        require_total_score: element.require_total_score,
        programCourseScheduleExamSubjects: this.baseFormBuilder.array([]),
      })
    }
  }
  programCourseScheduleExamSubjects_course(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_course_schedule_exam_subject_id: [null],
        program_course_schedule_exam_id: [null],
        exam_subject_id: [null],
        require_score: [0],
        full_score: [0],
        
      })
    } else {
      return this.FormBuilder.group({
        program_course_schedule_exam_subject_id: element.program_course_schedule_exam_subject_id,
        program_course_schedule_exam_id: element.program_course_schedule_exam_id,
        exam_subject_id: element.exam_subject_id,
        require_score: element.require_score == null || element.require_score == undefined ? 0 :element.require_score,
        full_score: element.full_score == null || element.full_score == undefined ? 0 :element.full_score,
      })
    }
  }
  schedulesCourseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_schedule_id: [null],
        program_id: [null],
        course_id: [null],
        program_course_id: [null],
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
        written_exam_announcement_date: [null],
        written_exam_announcement_time: [null],
        interview_exam_announcement_date: [null],
        interview_exam_announcement_time: [null],
        // parent_schedule_id: [null],
        // use_parent_schedule: [true],
        start_time: [''],
        end_time: [''],
        status_id: [0],
        validate_by_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null],
        writtenExamRooms: this.baseFormBuilder.array([]),
        writtenExamResults: this.baseFormBuilder.array([]),
        programCourseScheduleExams: this.baseFormBuilder.array([])
      })
    } else {
      return this.FormBuilder.group({
        program_schedule_id: element.program_schedule_id,
        program_id: element.program_id,
        course_id: element.course_id,
        program_course_id: element.program_course_id,
        validate_by_id: element.validate_by_id,
        program_schedule_code: element.program_schedule_code,
        program_schedule_name_en: element.program_schedule_name_en,
        program_schedule_name_th: element.program_schedule_name_th,
        apply_start_date: element.apply_start_date,
        apply_end_date: element.apply_end_date,
        written_exam_start_date: element.written_exam_start_date,
        written_exam_end_date: element.written_exam_end_date,
        interview_exam_start_date: element.interview_exam_start_date,
        interview_exam_end_date: element.interview_exam_end_date,
        enrollment_start_date: element.enrollment_start_date,
        enrollment_end_date: element.enrollment_end_date,
        interview_exam_announcement_date: element.interview_exam_announcement_date,
        interview_exam_announcement_time: element.interview_exam_announcement_time,
        parent_schedule_id: this.data.program.schedules[0].program_schedule_id,
        // use_parent_schedule: element.use_parent_schedule,
        start_time: element.start_time,
        end_time: element.end_time,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date,
        writtenExamRooms: this.baseFormBuilder.array([]),
        writtenExamResults: this.baseFormBuilder.array([]),
        programCourseScheduleExams: this.baseFormBuilder.array([])
      })
    }
  }
  addschedulesCourseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_schedule_id: [null],
        program_id: [null],
        course_id: [null],
        program_course_id: [null],
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
        written_exam_announcement_date: [null],
        written_exam_announcement_time: [null],
        interview_exam_announcement_date: [null],
        interview_exam_announcement_time: [null],
        // parent_schedule_id: [null],
        // use_parent_schedule: [true],
        start_time: [''],
        end_time: [''],
        status_id: [0],
        validate_by_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null],
        writtenExamRooms: this.baseFormBuilder.array([]),
        writtenExamResults: this.baseFormBuilder.array([]),
        programCourseScheduleExams: this.baseFormBuilder.array([])
      })
    } else {
      return this.FormBuilder.group({
        program_schedule_id: null,
        program_id: element.program_id,
        course_id: element.course_id,
        program_course_id: element.program_course_id,
        validate_by_id: element.validate_by_id,
        program_schedule_code: element.program_schedule_code,
        program_schedule_name_en: element.program_schedule_name_en,
        program_schedule_name_th: element.program_schedule_name_th,
        apply_start_date: element.apply_start_date,
        apply_end_date: element.apply_end_date,
        written_exam_start_date: element.written_exam_start_date,
        written_exam_end_date: element.written_exam_end_date,
        interview_exam_start_date: element.interview_exam_start_date,
        interview_exam_end_date: element.interview_exam_end_date,
        enrollment_start_date: element.enrollment_start_date,
        enrollment_end_date: element.enrollment_end_date,
        interview_exam_announcement_date: element.interview_exam_announcement_date,
        interview_exam_announcement_time: element.interview_exam_announcement_time,
        parent_schedule_id: this.data.program.schedules[0].program_schedule_id,
        // use_parent_schedule: element.use_parent_schedule,
        start_time: element.start_time,
        end_time: element.end_time,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date,
        writtenExamRooms: this.baseFormBuilder.array([]),
        writtenExamResults: this.baseFormBuilder.array([]),
        programCourseScheduleExams: this.baseFormBuilder.array([])
      })
    }
  }
  createForm() {
    return this.baseFormBuilder.group({
      courseSchedules: this.baseFormBuilder.array([]),
    })
  }
}
