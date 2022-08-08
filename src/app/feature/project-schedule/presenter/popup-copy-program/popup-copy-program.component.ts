import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseForm } from 'src/app/core/base/base-form';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { StatusService } from 'src/app/core/service/status.service';

@Component({
  selector: 'popup-copy-program',
  templateUrl: './popup-copy-program.component.html',
  styleUrls: ['./popup-copy-program.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupcopyProgramComponent extends BaseForm implements OnInit {
  rows: any = [
    { year: 'xx', term: 'xx', code: 'xx', name: 'ตัวอย่าง', status: 'ตัวอย่าง', action: '' }
  ]
  academicYearData = []
  academicSemesterData = []
  educationTypesData = []
  statusData = []
  programData = []
  programCopySave: any

  get schedule() {
    return this.form.get('schedules') as FormArray;
  }
  constructor(
    public dialogRef: MatDialogRef<PopupcopyProgramComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public AcademicYearService: AcademicYearService,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public EducationTypesService: EducationTypesService,
    public StatusService: StatusService,
    public appSV: AppService,
    public ProgramsService: ProgramsService,
    public AcademicSemesterService: AcademicSemesterService,
    public dialog: MatDialog,
  ) {
    super(FormBuilder, activeRoute)
    this.AcademicYearService.getAll().subscribe((x: any) => {
      console.log(x)
      this.academicYearData = x
    })
    this.EducationTypesService.getAll().subscribe((x: any) => {
      console.log(x)
      this.educationTypesData = x
    })
    this.StatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.statusData = x
    })
    this.ProgramsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.programData = x

    })
  }

  ngOnInit(): void {
    console.log(this.data)
    this.ProgramsService.getDate(this.data.program_id).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'Error')
        return throwError(err)
      }),
      tap((res: any) => {
        console.log(res)
        this.programCopySave = res
        this.form.patchValue({
          program_id: null,
          academic_year_id: res.academic_year_id,
          academic_semester_id: res.academic_semester_id,
          program_code: res.program_code,
          program_name_en: res.program_name_en,
          program_name_th: res.program_name_th,
          program_detail_en: res.program_detail_en,
          program_detail_th: res.program_detail_th,
          online_application_type_id: res.online_application_type_id,
          exam_room_announcement_type_id: res.exam_room_announcement_type_id,
          start_exam_seat_number: res.start_exam_seat_number,
          education_type_id: res.education_type_id,
          education_type_code: res.education_type_code,
          maximum_apply_course: res.maximum_apply_course,
          email_template_id: res.email_template_id,
          is_subject: res.programExamSubjects.length != 0 ? true : false,
          is_couse_check: false,
          status_id: res.status_id,
          create_by: res.create_by,
          create_date: res.create_date,
          last_update_by: res.last_update_by,
          last_update_date: res.last_update_date,
        })
        this.changeYear(res.academic_year_id)
        if (res.schedules) {
          res.schedules.forEach((schedules, ischedules) => {
            let itemsArray = this.form.get('schedules') as FormArray
            itemsArray.push(this.schedulesForm(schedules))
          })
        }
      })

    )





      .subscribe((res: any) => {


        // this.progressBar.complete()
        // this.loading =  false
      })
  }


  dateChange(form, date: moment.Moment, text) {
    form.get(`${text}`).setValue(moment(date).add(7, 'hours').toDate())


  }
  closeDialog() {
    this.dialogRef.close('close')
  }
  changeYear(id) {
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_id=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
  }

  save() {
      if (this.form.get('maximum_apply_course').value == 0 || this.form.get('maximum_apply_course').value == null || this.form.get('maximum_apply_course').value == '') {
        this.appSV.swaltAlertError('', 'กรุณากรอก จำนวนหลักสูตรที่สมัครได้')
      } else {
        this.programCopySave.program_id = null
        this.programCopySave.start_exam_seat_number = Number(this.programCopySave.start_exam_seat_number)
        this.programCopySave.academic_year_id = this.form.get('academic_year_id').value
        this.programCopySave.academic_semester_id = this.form.get('academic_semester_id').value
        this.programCopySave.education_type_id = this.form.get('education_type_id').value
        this.programCopySave.program_code = this.form.get('program_code').value
        this.programCopySave.program_name_th = this.form.get('program_name_th').value
        this.programCopySave.program_name_en = this.form.get('program_name_en').value
        this.programCopySave.status_id = this.form.get('status_id').value
        this.programCopySave.program_detail_th = this.form.get('program_detail_th').value
        this.programCopySave.schedules[0].program_schedule_code = this.schedule.at(0).get('program_schedule_code').value
        this.programCopySave.schedules[0].program_schedule_name_th = this.schedule.at(0).get('program_schedule_name_th').value
        this.programCopySave.schedules[0].start_time = this.schedule.at(0).get('start_time').value
        this.programCopySave.schedules[0].end_time = this.schedule.at(0).get('end_time').value
        this.programCopySave.schedules[0].apply_start_date = this.schedule.at(0).get('apply_start_date').value
        this.programCopySave.schedules[0].apply_end_date = this.schedule.at(0).get('apply_end_date').value
        this.programCopySave.schedules[0].written_exam_start_date = this.schedule.at(0).get('written_exam_start_date').value
        this.programCopySave.schedules[0].written_exam_end_date = this.schedule.at(0).get('written_exam_end_date').value
        this.programCopySave.schedules[0].interview_exam_start_date = this.schedule.at(0).get('interview_exam_start_date').value
        this.programCopySave.schedules[0].interview_exam_end_date = this.schedule.at(0).get('interview_exam_end_date').value
        this.programCopySave.schedules[0].enrollment_start_date = this.schedule.at(0).get('enrollment_start_date').value
        this.programCopySave.schedules[0].enrollment_end_date = this.schedule.at(0).get('enrollment_end_date').value
        this.programCopySave.schedules[0].enrollment_end_date = this.schedule.at(0).get('enrollment_end_date').value
        this.programCopySave.schedules[0].written_exam_announcement_time = this.schedule.at(0).get('written_exam_announcement_time').value
        this.programCopySave.schedules[0].written_exam_announcement_date = this.schedule.at(0).get('written_exam_announcement_date').value
        this.programCopySave.schedules[0].interview_exam_announcement_date = this.schedule.at(0).get('interview_exam_announcement_date').value
        this.programCopySave.schedules[0].interview_exam_announcement_time = this.schedule.at(0).get('interview_exam_announcement_time').value
        this.programCopySave.schedules[0].program_id = null
        this.programCopySave.schedules[0].program_schedule_id = null
        this.programCopySave.schedules[0].program_course_id = null
        this.programCopySave.schedules[0].parent_schedule_id = null
        this.programCopySave.schedules[0].writtenExamRooms.forEach(element => {
          element.written_exam_room_id = null
          element.program_schedule_id = null
        });
        this.programCopySave.applyActions.forEach(element => {
          element.program_id = null
          element.program_apply_action_id = null
        });
        this.programCopySave.applyPrices.forEach(element => {
          element.program_id = null
          element.program_apply_price_id = null
        });
        this.programCopySave.documents.forEach(element => {
          element.program_id = null
          element.program_document_id = null
        });
        console.log(this.programCopySave)
        this.programCopySave.programCourses.forEach(element => {
          element.program_id = null
          element.program_course_id = null
          if(element.courseSchedules){
            element.courseSchedules.forEach(courseSchedules => {
              courseSchedules.program_schedule_id = null
              courseSchedules.program_course_id = null
              courseSchedules.program_id = null
              courseSchedules.parent_schedule_id = null
              courseSchedules.programCourseScheduleExams.forEach(programCourseScheduleExam => {
                programCourseScheduleExam.program_course_schedule_exam_id = null
                programCourseScheduleExam.program_schedule_id = null
                programCourseScheduleExam.programCourseScheduleExamSubjects.forEach(programCourseScheduleExamSubject => {
                  programCourseScheduleExamSubject.program_course_schedule_exam_subject_id = null
                  programCourseScheduleExamSubject.program_course_schedule_exam_id = null
                });
              });
  
            });
          }
         
        });
        this.programCopySave.programExamSubjects.forEach(element => {
          element.program_id = null
          element.program_exam_subject_id = null
        });
        console.log(this.programCopySave)
        this.ProgramsService.add(this.programCopySave).pipe(
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
            this.closeDialog()
          })
    }

  }

  schedulesForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_schedule_id: [null],
        program_id: [null],
        program_schedule_code: ['', [Validators.required]],
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
        interview_exam_announcement_date: [null],
        interview_exam_announcement_time: [null],
        written_exam_announcement_date: [null],
        written_exam_announcement_time: [null],
        start_time: [''],
        end_time: [''],
        status_id: [0],
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
        written_exam_announcement_date: element.written_exam_announcement_date,
        written_exam_announcement_time: element.written_exam_announcement_time,
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
      program_id: [null],
      academic_year_id: [null, [Validators.required]],
      academic_semester_id: [null, [Validators.required]],
      program_code: ['', [Validators.required]],
      program_name_en: [''],
      program_name_th: ['', [Validators.required]],
      program_detail_en: [''],
      program_detail_th: [''],
      online_application_type_id: [null],
      email_template_id: [null],
      status_id: [0],
      create_by: [null],
      create_datetime: [null],
      last_update_by: [null],
      last_update_datetime: [null],
      exam_room_announcement_type_id: [1],
      start_exam_seat_number: [0],
      education_type_id: [null, [Validators.required]],
      education_type_code: [''],
      maximum_apply_course: [1],
      is_subject: [false],
      is_couse_check: [false],
      applyPrices: this.baseFormBuilder.array([]),
      schedules: this.baseFormBuilder.array([]),
      courses: this.baseFormBuilder.array([]),
      documents: this.baseFormBuilder.array([]),
      applyActions: this.baseFormBuilder.array([]),
      programCourses: this.baseFormBuilder.array([]),
      programExamSubjects: this.baseFormBuilder.array([]),
    })
  }
}
