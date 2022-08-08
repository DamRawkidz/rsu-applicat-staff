import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupInterviewComponent } from '../popup-interview/popup-interview.component';
import { BaseForm } from 'src/app/core/base/base-form';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { AppService } from 'src/app/core/service/app.service';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { StatusService } from 'src/app/core/service/status.service';
import { OnlineApplicationTypeService } from 'src/app/core/service/online-application-type.service';
import { ExamRoomAnnouncementTypeService } from 'src/app/core/service/exam-room-announcement-type.service';
import { CourseService } from 'src/app/core/service/course.service';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { MajorService } from 'src/app/core/service/major.service';
import { PopupcopyProgramComponent } from '../popup-copy-program/popup-copy-program.component';

@Component({
  selector: 'edit-project-schedule',
  templateUrl: './edit-project-schedule.component.html',
  styleUrls: ['./edit-project-schedule.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProjectScheduleComponent extends BaseForm implements OnInit {
  rows:any = []
  onlineApplicationTypeData = []
  academicSemesterData = []
  statusData = []
  academicYearData = []
  examRoomAnnouncementTypeData = []
  majorData = []
  facultyData = []
  constructor(public router:Router,
              public FormBuilder:FormBuilder,
              public ProgramsService:ProgramsService,
              public CourseService:CourseService,
              public appSV:AppService,
              public activeRoute: ActivatedRoute,
              public FacultyService: FacultyService,
              public MajorService: MajorService,
              public AcademicSemesterService:AcademicSemesterService,
              public AcademicYearService:AcademicYearService,
              public ExamRoomAnnouncementTypeService:ExamRoomAnnouncementTypeService,
              public StatusService:StatusService,
              public OnlineApplicationTypeService:OnlineApplicationTypeService,
              public dialog: MatDialog,) {super(FormBuilder,activeRoute) 
                this.AcademicSemesterService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.academicSemesterData = x
                })
                this.AcademicYearService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.academicYearData = x
                })
                this.StatusService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.statusData = x
                })
                this.OnlineApplicationTypeService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.onlineApplicationTypeData = x
                })
                this.ExamRoomAnnouncementTypeService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.examRoomAnnouncementTypeData = x
                })
                this.FacultyService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.facultyData = x
                })
                this.MajorService.getAll().subscribe((x:any)=>{
                  console.log(x)
                  this.majorData = x
                })
              }

  ngOnInit(): void {
    console.log(this.id)
    switch (this.state) {
      case 'edit':
        this.ProgramsService.getDate(this.id).subscribe((res: any) => {
          this.form.patchValue({
            program_id:res.program_id,
            academic_year_id:res.academic_year_id,
            academic_semester_id:res.academic_semester_id,
            program_code:res.program_code,
            program_name_en:res.program_name_en,
            program_name_th:res.program_name_th,
            start_date:res.start_date,
            end_date:res.end_date,
            program_detail_en:res.program_detail_en,
            program_detail_th:res.program_detail_th,
            online_application_type_id:res.online_application_type_id,
            status_id:res.status_id,
            create_by:res.create_by,
            create_date:res.create_date,
            last_update_by:res.last_update_by,
            last_update_date:res.last_update_date,
            exam_room_announcement_type_id:res.exam_room_announcement_type_id,
            start_exam_seat_number:res.start_exam_seat_number,
            search:res.search,
            education_type_id:res.education_type_id,
          })
          console.log(res)
          if(res.courses){
            res.courses.forEach((courses, indexCourse) => {
              let itemsArray = this.form.get('courses') as FormArray
              itemsArray.push(this.courseForm(courses))
            if(courses.interviews){
              courses.interviews.forEach((interviews) => {
                let interviewsArray = this.form.get('courses') as FormArray
                (<FormArray>interviewsArray.controls[indexCourse].get('interviews')).push(this.interviewForm(interviews))
              })
            }
            if(courses.writtens){
              courses.writtens.forEach((writtens) => {
                let writtensArray = this.form.get('courses') as FormArray
                (<FormArray>writtensArray.controls[indexCourse].get('writtens')).push(this.writtenForm(writtens))
              })
            }
          })
          }
        })
        break;
      case 'add':

        break;
    }
  }
  gotoCourseAddPage(){
    this.router.navigate(['app/Project/add-course'])
    this.CourseService.idProgramsChange$.next(this.form.get('program_id').value)
  }
  gotoCourseEditPage(id){
    this.router.navigate(['app/Project/course/edit',id])
  }
  openPopUpInterview() {
    const dialogRef = this.dialog.open(
      PopupInterviewComponent, {
      width: '50%',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })
    
  }
  
  courseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        course_id: [null],
        course_code: [''],
        course_name_en: [''],
        course_name_th: [''],
        program_id: [0],
        faculty_id: [0],
        major_id: [0],
        application_check_flag: [true],
        interview_exam_flag: [true],
        written_exam_flag: [true],
        status_id: [0],
        create_by: [null],
        create_date: null,
        last_update_by: [null],
        last_update_date: null,
        interviews: this.FormBuilder.array([]),
        writtens: this.FormBuilder.array([]),
      })
    } else {
      return this.FormBuilder.group({
        course_id:element.course_id,
        course_code:element.course_code,
        course_name_en:element.course_name_en,
        course_name_th:element.course_name_th,
        program_id:element.program_id,
        faculty_id:element.faculty_id,
        major_id:element.major_id,
        application_check_flag:element.application_check_flag,
        interview_exam_flag:element.interview_exam_flag,
        written_exam_flag:element.written_exam_flag,
        status_id:element.status_id,
        create_by:element.create_by,
        create_date:element.create_date,
        last_update_by:element.last_update_by,
        last_update_date:element.last_update_date,
        interviews: this.FormBuilder.array([]),
        writtens: this.FormBuilder.array([]),
      })
    }
  }
  interviewForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        course_interview_exam_id: [null],
        course_id: [null],
        course_interview_exam_code: [''],
        course_interview_exam_name_en: [''],
        course_interview_exam_name_th: [''],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        course_interview_exam_id:element.course_interview_exam_id,
        course_id:element.course_id,
        course_interview_exam_code:element.course_interview_exam_code,
        course_interview_exam_name_en:element.course_interview_exam_name_en,
        course_interview_exam_name_th:element.course_interview_exam_name_th,
        status_id:element.status_id,
        create_by:element.create_by,
        create_date:element.create_date,
        last_update_by:element.last_update_by,
        last_update_date:element.last_update_date
      })
    }
  }
  writtenForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        course_written_exam_id: [0],
        course_id: [0],
        row_order: [0],
        exam_subject_id: [0],
        subjective_score: [0],
        objective_score: [0],
        total_score: [0],
        pass_score: [0],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        course_written_exam_id:element.course_written_exam_id,
        course_id:element.course_id,
        row_order:element.row_order,
        exam_subject_id:element.exam_subject_id,
        subjective_score:element.subjective_score,
        objective_score:element.objective_score,
        total_score:element.total_score,
        pass_score:element.pass_score,
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
      program_id: [null],
      academic_year_id: [0],
      academic_semester_id: [0],
      program_code: [''],
      program_name_en: [''],
      program_name_th: [''],
      start_date: null,
      end_date: null,
      program_detail_en: [''],
      program_detail_th: [''],
      online_application_type_id: [0],
      status_id: [0],
      create_by: [null],
      create_date: null,
      last_update_by: [null],
      last_update_date: null,
      exam_room_announcement_type_id: [0],
      start_exam_seat_number: [''],
      search: [''],
      education_type_id: [0],
      courses:this.baseFormBuilder.array([])
    })
  }
}
