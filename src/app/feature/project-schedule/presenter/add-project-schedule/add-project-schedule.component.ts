import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BaseForm, sortByProperty } from 'src/app/core/base/base-form';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { AppService } from 'src/app/core/service/app.service';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { OnlineApplicationTypeService } from 'src/app/core/service/online-application-type.service';
import { StatusService } from 'src/app/core/service/status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { ExamRoomAnnouncementTypeService } from 'src/app/core/service/exam-room-announcement-type.service';
import { BuildingService } from 'src/app/core/service/building.service';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import { NgProgressComponent } from 'ngx-progressbar';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { MajorService } from 'src/app/core/service/major.service';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { CourseService } from 'src/app/core/service/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import * as moment from 'moment';
import { TimeFormatterPipe } from 'ngx-material-timepicker/src/app/material-timepicker/pipes/time-formatter.pipe';
import swal from 'sweetalert2'




@Component({
  selector: 'add-project-schedule',
  templateUrl: './add-project-schedule.component.html',
  styleUrls: ['./add-project-schedule.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddProjectScheduleComponent extends BaseForm implements OnInit, AfterViewInit {
  onlineApplicationTypeData = []
  academicSemesterData = []
  statusData = []
  academicYearData = []
  educationTypesData = []
  buildingData = []
  roomsData = []
  emailTemplateData = []
  examRoomAnnouncementTypeData = []
  applicationStatusData = []
  documentData = []
  applyAction = {
    program_apply_action_id: null,
    program_id: null,
    application_status_id: null,
    action_type_id: null,
    action_template_id: null,
  }
  loading: boolean = false
  majorData = []
  facultyData = []
  examSubjectsData = []
  courseData = []
  courseFunctionForm = []
  courseFunctionFormCheck = []
  a = false
  title = 'demo';
  startTime: any
  programData = []
  value: string = '';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  @ViewChild(NgProgressComponent, { static: true }) progressBar: NgProgressComponent;
  @ViewChild('course', { static: true }) courseCheck: ElementRef
  @ViewChild('courseAll', { static: true }) courseAll: ElementRef
  constructor(public FormBuilder: FormBuilder,
    public appSV: AppService,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public AcademicSemesterService: AcademicSemesterService,
    public AcademicYearService: AcademicYearService,
    public StatusService: StatusService,
    public CourseService: CourseService,
    public dialog: MatDialog,
    public EducationTypesService: EducationTypesService,
    public MajorService: MajorService,
    public FacultyService: FacultyService,
    public ExamRoomAnnouncementTypeService: ExamRoomAnnouncementTypeService,
    public BuildingService: BuildingService,
    public EmailTemplateService: EmailTemplateService,
    public DocumentTypesService: DocumentTypesService,
    public ExamSubjectsService: ExamSubjectsService,
    public ApplicationStatusService: ApplicationStatusService,
    public OnlineApplicationTypeService: OnlineApplicationTypeService,
    public ProgramsService: ProgramsService) {
    super(FormBuilder, activeRoute)
    this.loading = true
    this.CourseService.getAll().subscribe((x: any) => {
      console.log(x)
      this.courseData = x
    })
    this.EmailTemplateService.getAll().subscribe((x: any) => {
      console.log(x)
      this.emailTemplateData = x
    })
    this.ProgramsService.getAll().subscribe((x: any) => {
      console.log(x)
      this.programData = x

    })
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
    this.BuildingService.getAll().subscribe((x: any) => {
      console.log(x)
      this.buildingData = x
    })
    this.ApplicationStatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.applicationStatusData = x
      let i = this.applicationStatusData.findIndex(x => x.application_status_id == 4)
      if (i != -1) {
        this.applicationStatusData.splice(i, 1)
      }

    })
    this.EducationTypesService.getAll().subscribe((x: any) => {
      console.log(x)
      this.educationTypesData = x
    })
    this.ExamRoomAnnouncementTypeService.getAll().subscribe((x: any) => {
      console.log(x)
      this.examRoomAnnouncementTypeData = x
    })
    // this.AcademicSemesterService.getAll().subscribe((x: any) => {
    //   console.log(x)
    //   this.academicSemesterData = x
    // })
    this.AcademicYearService.getAll().subscribe((x: any) => {
      console.log(x)
      this.academicYearData = x
    })
    this.StatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.statusData = x
    })
    this.OnlineApplicationTypeService.getAll().subscribe((x: any) => {
      console.log(x)
      this.onlineApplicationTypeData = x
    })
  }
  onChangeHour(event) {
    console.log('event', event);
  }
  ngAfterViewInit(): void {
    console.log(this.id)
    console.log(this.state)
    switch (this.state) {
      case 'edit':
        // this.progressBar.start()
        // this.loading =  true
        this.ProgramsService.getDate(this.id).pipe(
          catchError(err => {
            // alert ตรงนี่
            this.appSV.swaltAlertError('', 'Error')
            return throwError(err)
          }),
          tap((res: any) => {
            console.log(res)
            this.form.patchValue({
              program_id: res.program_id,
              academic_year_uid: res.academic_year_uid,
              academic_semester_uid: res.academic_semester_uid,
              program_code: res.program_code,
              program_name_en: res.program_name_en,
              program_name_th: res.program_name_th,
              program_detail_en: res.program_detail_en,
              program_detail_th: res.program_detail_th,
              online_application_type_id: res.online_application_type_id,
              exam_room_announcement_type_id: res.exam_room_announcement_type_id,
              start_exam_seat_number: res.start_exam_seat_number,
              education_type_uid: res.education_type_uid,
              education_type_code: res.education_type_code,
              maximum_apply_course: res.maximum_apply_course,
              email_template_id: res.email_template_id,
              one_time_apply: res.one_time_apply,
              is_subject: res.programExamSubjects.length != 0 ? true : false,
              is_couse_check: false,
              status_id: res.status_id,
              create_by: res.create_by,
              create_date: res.create_date,
              last_update_by: res.last_update_by,
              last_update_date: res.last_update_date,
            })
            this.value = `https://rsu-app.71dev.com/app/register/${res.program_id}`
            console.log(this.value)
            let i = this.programData.findIndex(x => x.program_code == res.program_code)
            if (i != -1) {
              this.programData.splice(i, 1)
            }
            this.changeYear(res.academic_year_id)
            if (res.schedules) {
              res.schedules.forEach((schedules, ischedules) => {
                let itemsArray = this.form.get('schedules') as FormArray
                itemsArray.push(this.schedulesForm(schedules))
                if (schedules.writtenExamRooms) {
                  schedules.writtenExamRooms.forEach((writtenExamRooms) => {
                    this.getRooms(writtenExamRooms.building_code);
                    (<FormArray>(<FormArray>this.form.get('schedules')).controls[ischedules].get('writtenExamRooms')).push(this.writtenExamRoomsForm(writtenExamRooms));
                    // let itemsArraywrittenExamRooms = itemsArray.get('writtenExamRooms') as FormArray
                    // itemsArraywrittenExamRooms.push(this.writtenExamRoomsForm(writtenExamRooms))
                  })
                }
              })
            }
            if (res.applyPrices) {
              res.applyPrices.sort(sortByProperty('course_order_no'))
              res.applyPrices.forEach((applyPrices) => {
                let itemsArray = this.form.get('applyPrices') as FormArray
                itemsArray.push(this.applyPricesForm(applyPrices))
              })
            }
            if (res.applyActions) {
              res.applyActions.forEach((applyActions) => {
                let itemsArray = this.form.get('applyActions') as FormArray
                itemsArray.push(this.applyActionsForm(applyActions))
              })
            }
            if (res.documents) {
              res.documents.forEach((documents) => {
                let itemsArray = this.form.get('documents') as FormArray
                itemsArray.push(this.documentProgramForm(documents))
              })
            }
            if (res.programExamSubjects) {
              res.programExamSubjects.forEach((programExamSubjects) => {
                let itemsArray = this.form.get('programExamSubjects') as FormArray
                itemsArray.push(this.programExamSubjectsForm(programExamSubjects))
              })
            }
            if (res.programCourses) {
              res.programCourses.forEach((programCourses, iprogramCourses) => {
                let itemsArray = this.form.get('programCourses') as FormArray
                itemsArray.push(this.courseForm(programCourses))
                if (programCourses.courseDocuments) {
                  programCourses.courseDocuments.forEach((courseDocuments) => {
                    (<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseDocuments')).push(this.documentCourseForm(courseDocuments));
                  })
                }

                if (programCourses.courseSchedules) {
                  programCourses.courseSchedules.forEach((courseSchedules, icourseSchedules) => {
                    (<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseSchedules')).push(this.schedulesCourseForm(courseSchedules));
                    if (programCourses.writtenExamRooms) {
                      programCourses.writtenExamRooms.forEach((writtenExamRooms) => {
                        (<FormArray>(<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseSchedules')).controls[icourseSchedules].get('writtenExamRooms')).push(this.writtenExamRoomsCourseForm(writtenExamRooms));
                      })
                    }
                    console.log(programCourses)
                    if (courseSchedules.programCourseScheduleExams) {
                      courseSchedules.programCourseScheduleExams.forEach((programCourseScheduleExams, indexprogramCourseScheduleExams) => {
                        (<FormArray>(<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseSchedules')).controls[icourseSchedules].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course(programCourseScheduleExams));
                        programCourseScheduleExams.programCourseScheduleExamSubjects.forEach(programCourseScheduleExamSubjects => {
                          (<FormArray>(<FormArray>(<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseSchedules')).controls[icourseSchedules].get('programCourseScheduleExams')).controls[indexprogramCourseScheduleExams].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjectsForm(programCourseScheduleExamSubjects));
                        });

                      })
                    }
                    // if (programCourses.writtenExamResults) {
                    //   programCourses.writtenExamResults.forEach((writtenExamResults) => {
                    //     (<FormArray>(<FormArray>(<FormArray>this.form.get('programCourses')).controls[iprogramCourses].get('courseSchedules')).controls[icourseSchedules].get('writtenExamResults')).push(this.writtenExamRoomsCourseForm(writtenExamResults));        
                    //   })
                    // }

                  })
                }
              })
            }
          })

        )





          .subscribe((res: any) => {


            // this.progressBar.complete()
            // this.loading =  false
          })
        break;
      case 'add':
        (<FormArray>this.form.get('applyPrices')).push(this.applyPricesForm())
        this.loading = false
        this.addschedulesForm()
        break;
    }
  }

  ngOnInit(): void {

  }


  dateChange(form, date: moment.Moment, text) {
    form.get(`${text}`).setValue(moment(date).add(7, 'hours').toDate())
  }

  save() {

    swal.fire({
      title: 'Please Wait !',
      html: 'data uploading',// add html attribute if you want or remove
      allowOutsideClick: false,
      onBeforeOpen: () => {
          swal.showLoading()
      },
  });




    if (this.form.get('program_id').value != null) {
      console.log(this.form.getRawValue())
      this.ProgramsService.update(this.form.get('program_id').value, this.form.getRawValue()).pipe(
        catchError(err => {
          // alert ตรงนี่
          console.log(err)
          if (err.status == 400) {
            swal.close();
            this.appSV.swaltAlertError('', err.message)
          } else {
            swal.close();
            this.appSV.swaltAlertError('', 'Error')
            
          }
          swal.close();
          return throwError(err)
        })).subscribe((x: any) => {
          console.log(x)
          // this.SubjectComponent.ngOnInit()
          swal.close();
          this.appSV.swaltAlert()
          this.router.navigate(['app/Project'])
        })

    } else {
      if (this.form.get('maximum_apply_course').value == 0 || this.form.get('maximum_apply_course').value == null || this.form.get('maximum_apply_course').value == '') {
        this.appSV.swaltAlertError('', 'กรุณากรอก จำนวนหลักสูตรที่สมัครได้')
      } else {
        console.log(this.form.getRawValue())
        this.ProgramsService.add(this.form.getRawValue()).pipe(
          catchError(err => {
            // alert ตรงนี่
            if (err.error.err == 400) {
              swal.close();
              this.appSV.swaltAlertError('', err.error.msg)
            } else {
              swal.close();
              this.appSV.swaltAlertError('', 'Error')
            }
            swal.close();
            return throwError(err)
          })).subscribe((x: any) => {
            console.log(x)
            // this.SubjectComponent.ngOnInit()
            swal.close();
            this.appSV.swaltAlert()
            this.router.navigate(['app/Project'])
          })
        // }

      }


    }


  }
  close() {
    this.router.navigate(['app/Project'])
  }
  add_apply_course() {
    // setTimeout(() => {

    this.form.get('maximum_apply_course').valueChanges.pipe(
      delay(1000),
      tap(x => {
        console.log(Number(x) <= 0)
      }),
      tap(x => {
        // if(Number(x) <= 0){
        //   this.form.get('maximum_apply_course').setValue(1)
        // }
        if (x > 99) {
          const applyPrices = this.form.get('applyPrices') as FormArray
          while (applyPrices.length != 0) {
            applyPrices.removeAt(0)
          }
          this.form.get('maximum_apply_course').setValue(99)
          for (let index = 0; index < this.form.get('maximum_apply_course').value; index++) {
            (<FormArray>this.form.get('applyPrices')).push(this.applyPricesForm({ course_order_no: index + 1 }))
          };
        } else {
          const applyPrices = this.form.get('applyPrices') as FormArray
          while (applyPrices.length != 0) {
            applyPrices.removeAt(0)
          }
          for (let index = 0; index < this.form.get('maximum_apply_course').value; index++) {
            (<FormArray>this.form.get('applyPrices')).push(this.applyPricesForm({ course_order_no: index + 1 }))
          };
        }

      })
    ).subscribe()
    // }, 1000);
  }
  total(form, i) {
    setTimeout(() => {
      if (i > 0) {
        const applyPrices = this.form.get('applyPrices') as FormArray
        return form.get('totalprice').setValue(applyPrices.controls[i - 1].get('totalprice').value + form.get('price').value)
      } else {
        return form.get('totalprice').setValue(form.get('price').value)
      }
    }, 1000);

  }
  setTotal() {
    setTimeout(() => {
      let total = 0
      const formArray = this.form.get('applyPrices') as FormArray
      formArray.controls.forEach((x, i) => {
        for (let index = i; index > -1; index++) {
          total += x.get('price').value
          x.get('totalprice').setValue(total)
        }
      })
    }, 1000);


  }
  changeOnePrice(value) {
    // if (value.checked) {
    //   const applyPrices = this.form.get('applyPrices') as FormArray
    //   while (applyPrices.length != 0) {
    //     applyPrices.removeAt(0)
    //   }
    //   this.form.get('maximum_apply_course').setValue(1)
    //   this.form.get('maximum_apply_course').disable()
    //   for (let index = 0; index < this.form.get('maximum_apply_course').value; index++) {
    //     (<FormArray>this.form.get('applyPrices')).push(this.applyPricesForm({ course_order_no: index + 1 }))
    //   };
    // } else {
    //   this.form.get('maximum_apply_course').enable()
    // }
  }
  getRooms(floorCode) {
    console.log(floorCode)
    let a = encodeURIComponent(floorCode)
    console.log(a)
    this.BuildingService.getRooms(a).subscribe((x: any) => {
      console.log(x)
      this.roomsData = x
    })
  }
  delschedulesForm(i) {
    (<FormArray>this.form.get('schedules')).removeAt(i)
  }
  addschedulesForm() {
    // this.progressBar.start();
    (<FormArray>this.form.get('schedules')).push(this.schedulesForm())
  }
  addActionForm() {

    if (this.applyAction.application_status_id == null) {
      this.appSV.swaltAlertError('', 'กรุณาเลือกสถานะ')
    } else {
      if (this.applyAction.action_template_id == null) {
        this.appSV.swaltAlertError('', 'กรุณาเลือกเทมเพลตอีเมล')
      } else {
        (<FormArray>this.form.get('applyActions')).push(this.applyActionsForm(this.applyAction))
      }
    }


  }
  delActionForm(i) {
    (<FormArray>this.form.get('applyActions')).removeAt(i)
  }
  del_programCourses_Form(i) {
    (<FormArray>this.form.get('programCourses')).removeAt(i)
  }
  addwrittenExamRoomsForm(form) {
    (<FormArray>form.get('writtenExamRooms')).push(this.writtenExamRoomsForm({ row_order: (<FormArray>form.get('writtenExamRooms')).controls.length + 1 }))
  }
  addprogramExamSubjectsForm() {
    (<FormArray>this.form.get('programExamSubjects')).push(this.programExamSubjectsForm())
  }
  addprogramCourseScheduleExamsForm(form) {
    (<FormArray>form.get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm())
  }
  delwrittenExamRoomsForm(form, i) {
    (<FormArray>form.get('writtenExamRooms')).removeAt(i)
  }
  delprogramExamSubjectsForm(i) {
    (<FormArray>this.form.get('programExamSubjects')).removeAt(i)
  }
  addDocument(value, data) {
    console.log(value)
    console.log(data)
    if (value) {
      (<FormArray>this.form.get('documents')).push(this.documentProgramForm({ document_type_id: data.document_type_id }))
    } else {
      let i = this.form.value.documents.findIndex(x => x.document_type_id == data.document_type_id)
      console.log(i);
      if (i != -1) {
        let formDoc = this.form.get('documents') as FormArray
        formDoc.removeAt(i)
      }
    }
  }
  addDocumentCourse(value, data, form) {
    console.log(value)
    console.log(data)
    if (value) {
      (<FormArray>form.get('courseDocuments')).push(this.documentCourseForm({ document_type_id: data.document_type_id }))
    } else {
      let i = form.value.courseDocuments.findIndex(x => x.document_type_id == data.document_type_id)
      console.log(i);
      if (i != -1) {
        let formDoc = form.get('courseDocuments') as FormArray
        formDoc.removeAt(i)
      }
    }
  }
  // openPopUpWriting() {
  //   const dialogRef = this.dialog.open(
  //     PopupWritingComponent, {
  //     width: '100%',
  //     height: '100%',
  //     data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
  //   }
  //   )

  //   dialogRef.afterClosed().subscribe(callback => {
  //     console.log(callback)
  //   })

  // }


  // course

  openPopUpCourse() {

    if (this.form.get('education_type_id').value == '') {
      this.appSV.swaltAlertError('ผิดพลาด', 'กรุณาเลือกประเภทการศึกษา')
    } else {
      const dialogRef = this.dialog.open(
        AddCourseComponent, {
        width: '70%',
        data: this.form // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
      }
      )

      dialogRef.afterClosed().subscribe(callback => {
        console.log(callback)
        if (callback != undefined) {
          if (callback.length != 0) {
            if (callback.add.length != 0) {
              callback.add.forEach(element => {
                let i = (<FormArray>this.form.get('programCourses')).controls.findIndex(x => x.get('course_code').value == element.course_code);
                console.log(i);
                console.log(i === -1);
                if (i === -1) {
                  (<FormArray>this.form.get('programCourses')).push(this.courseForm(element))
                } else {
                  console.log('aaa')
                }
              });
            }
            if (callback.del.length != 0) {
              let formArray = this.form.get('programCourses') as FormArray
              callback.del.forEach((aa: any) => {
                let i = formArray.controls.findIndex(x => x.value.course_code == aa.course_code)
                console.log(i)
                if (i != -1) {
                  formArray.removeAt(i)
                }
              })
            }
          }
        }

      })

    }

  }
  openPopUpEditCourse() {

    if (this.courseFunctionForm.length == 0) {
      this.appSV.swaltAlertError('ผิดพลาด', 'กรุณาเลือกหลักสูตรที่จะแก้ไข')
    } else {
      const dialogRef = this.dialog.open(
        EditCourseComponent, {
        width: '70%',
        data: { course: this.courseFunctionForm, program: this.form.getRawValue() }// ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
      }
      )

      dialogRef.afterClosed().subscribe(callback => {
        console.log(callback)
        // this.courseAll.nativeElement.value = false
        if (callback) {
          this.courseFunctionForm.forEach(x => {
            console.log(x)
            if (callback.course != null) {
              x.get('validate_flag').setValue(callback.course.validate_flag)
              x.get('written_flag').setValue(callback.course.written_flag)
              x.get('interview_flag').setValue(callback.course.interview_flag)
              x.get('practice_flag').setValue(callback.course.practice_flag)
              x.get('written_price').setValue(callback.course.written_price)
              x.get('interview_price').setValue(callback.course.interview_price)
              x.get('practical_price').setValue(callback.course.practical_price)
              x.get('document_flag').setValue(callback.course.document_flag)
              x.get('schedule_flag').setValue(callback.course.schedule_flag)
              x.get('schedule_flag').setValue(callback.course.schedule_flag)
              x.get('validate_by_id').setValue(Number(callback.course.validate_by_id))
              x.get('is_flag').setValue(false)
              this.courseFunctionForm = []
              this.form.get('is_couse_check').setValue(false)
              console.log(x)
            }
            if (callback.document.length != 0) {
              callback.document.forEach(element => {
                (<FormArray>x.get('courseDocuments')).push(this.documentCourseForm(element))
              });
            }
            if (callback.action.length != 0) {
              callback.action.forEach(element => {
                (<FormArray>x.get('courseActions')).push(this.applyActionsForm_course(element))
              });
            }
            console.log(callback.schedule.length != 0);
            if (callback.schedule.length != 0) {
              const formArray = x.get('courseSchedules') as FormArray
              while (formArray.length != 0) {
                formArray.removeAt(0)
              }
              console.log(x)
              callback.schedule.forEach((element, ielement) => {
                console.log(element);

                (<FormArray>x.get('courseSchedules')).push(this.schedulesCourseForm(element))

                if (element.programCourseScheduleExams.length != 0) {
                  element.programCourseScheduleExams.forEach((programCourseScheduleExams, iprogramCourseScheduleExams) => {
                    (<FormArray>(<FormArray>x.get('courseSchedules')).controls[ielement].get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course(programCourseScheduleExams));

                    if (programCourseScheduleExams.programCourseScheduleExamSubjects.length != 0) {
                      programCourseScheduleExams.programCourseScheduleExamSubjects.forEach(programCourseScheduleExamSubjects => {
                        (<FormArray>(<FormArray>(<FormArray>x.get('courseSchedules')).controls[ielement].get('programCourseScheduleExams')).controls[iprogramCourseScheduleExams].get('programCourseScheduleExamSubjects')).push(this.programCourseScheduleExamSubjects_course(programCourseScheduleExamSubjects));
                      })
                    }
                    // (<FormArray>x.get('programCourseScheduleExams')).push(this.programCourseScheduleExamsForm_course(programCourseScheduleExams))
                  });
                }
              });


            }
            // if(callback.course != null){
            //   if(callback.course.schedule_flag){
            //     const formArray = x.get('courseSchedules') as FormArray
            //     while (formArray.length != 0) {
            //       formArray.removeAt(0)
            //     }
            //   }
            //   if(callback.course.document_flag){
            //     const formArray = x.get('courseDocuments') as FormArray
            //     while (formArray.length != 0) {
            //       formArray.removeAt(0)
            //     }
            //   }
            // }

          })

        }
      })
    }


  }
  addCourse() {
    (<FormArray>this.form.get('programCourses')).push(this.courseForm())
  }
  timeStart(data, form) {
    console.log(data)
    console.log(form)
    console.log(form.get('start_time').value)
    // form.get('start_time').push(data)
  }
  timEnd(data) {
    console.log(data)

  }
  editCourse(value, form) {
    if (value) {
      this.courseFunctionForm.push(form)
      console.log(this.courseFunctionForm)
    } else {
      let i = this.courseFunctionForm.findIndex(x => x.value.course_code == form.value.course_code)
      console.log(i);
      if (i != -1) {
        this.courseFunctionForm.splice(i, 1)
      }
      console.log(this.courseFunctionForm)
    }
  }
  addCourseAllSetting(value) {
    if (value) {
      this.courseFunctionForm = []
      this.courseFunctionFormCheck = []
      console.log(this.form.getRawValue().programCourses);
      (<FormArray>this.form.get('programCourses')).controls
        .forEach(element => {
          this.courseFunctionForm.push(element)
          this.courseFunctionFormCheck.push(element.value)
        });
      console.log(this.courseFunctionForm)
    } else {
      this.courseFunctionForm = []
      this.courseFunctionFormCheck = []
      console.log(this.courseFunctionForm)
    }
  }
  addschedules(value, form) {
    if (value) {
      const schedules = form.get('courseSchedules') as FormArray
      while (schedules.length != 0) {
        schedules.removeAt(0)
      }
      this.ProgramsService.getDate(this.form.get('program_id').value).subscribe((x: any) => {
        console.log(x);
        x.schedules.forEach(element => {
          (<FormArray>form.get('courseSchedules')).push(this.schedulesCourseForm(element))
        });
      })
    } else {
      const schedules = form.get('courseSchedules') as FormArray
      while (schedules.length != 0) {
        schedules.removeAt(0)
      }
    }
  }
  changeYear(id) {
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_uid=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
  }
  
  inputPrice(form) {
    if (form.get('price').value < 0) {
      form.get('price').setValue(0)
    }
  }
  change_is_subject(value){
    console.log(value.checked)
    if(value.checked){
      (<FormArray>this.form.get('programExamSubjects')).push(this.programExamSubjectsForm())
    }else{
      const programExamSubjects = this.form.get('programExamSubjects') as FormArray
      while (programExamSubjects.length != 0) {
        programExamSubjects.removeAt(0)
      }
    }
  }

  // changeFaculty(data){
  //   console.log(data)
  //   let item = this.programData.find(x=>x.program_id == data)
  //   console.log(item)
  //   this.FacultyService.getSearch(item.education_type_code,'education_type_code').subscribe((x:any)=>{
  //     console.log(x)
  //     this.facultyData = x
  //   })
  // }
  // changeMajor(data){
  //   console.log(data)
  //   let item = this.facultyData.find(x=>x.faculty_code == data)
  //   console.log(item)
  //   this.MajorService.getSearchToStr(item.faculty_code,'faculty_code',item.education_type_code,'education_type_code').subscribe((x:any)=>{
  //     console.log(x)
  //     this.majorData = x
  //   })
  // }
  // cores

  applyPricesForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_apply_price_id: [null],
        program_id: [null],
        course_order_no: [1],
        price: [0],
        totalprice: [0],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        program_apply_price_id: element.program_apply_price_id,
        program_id: element.program_id,
        course_order_no: element.course_order_no,
        price: element.price,
        totalprice: element.totalprice,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date
      })
    }
  }
  courseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_course_id: [null],
        program_id: [null],
        course_code: [''],
        validate_flag: [false],
        written_flag: [false],
        interview_flag: [false],
        practice_flag: [false],
        written_price: [0],
        interview_price: [0],
        practical_price: [0],
        document_flag: [true],
        schedule_flag: [true],
        is_flag: [false],
        status_id: [0],
        validate_by_id: [null],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null],
        program_schedule_id: [null],
        courseDocuments: this.baseFormBuilder.array([]),
        courseSchedules: this.baseFormBuilder.array([]),
        courseActions: this.baseFormBuilder.array([]),
      })
    } else {
      return this.FormBuilder.group({
        program_course_id: element.program_course_id,
        program_id: element.program_id,
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
        validate_by_id: element.validate_by_id,
        is_flag: [false],
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date,
        program_schedule_id: element.program_schedule_id,
        courseDocuments: this.baseFormBuilder.array([]),
        courseSchedules: this.baseFormBuilder.array([]),
        courseActions: this.baseFormBuilder.array([]),
      })
    }
  }
  applyActionsForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_apply_action_id: [null],
        program_id: [null],
        application_status_id: [0],
        action_type_id: [0],
        action_template_id: [0],
      })
    } else {
      return this.FormBuilder.group({
        program_apply_action_id: element.program_apply_action_id,
        program_id: element.program_id,
        application_status_id: element.application_status_id,
        action_type_id: element.action_type_id,
        action_template_id: element.action_template_id,
      })
    }
  }
  applyActionsForm_course(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_apply_action_id: [null],
        program_id: [null],
        program_course_id: [null],
        application_status_id: [0],
        action_type_id: [0],
        action_template_id: [0],
      })
    } else {
      return this.FormBuilder.group({
        program_apply_action_id: element.program_apply_action_id,
        program_id: element.program_id,
        program_course_id: element.program_course_id,
        application_status_id: element.application_status_id,
        action_type_id: element.action_type_id,
        action_template_id: element.action_template_id,
      })
    }
  }
  writtenExamRoomsForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        written_exam_room_id: [null],
        program_schedule_id: [null],
        row_order: [0],
        room_no: [''],
        total_seats: [0],
        used_seats: [0],
        available_seats: [null],
        building_code: [''],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        written_exam_room_id: element.written_exam_room_id,
        program_schedule_id: element.program_schedule_id,
        row_order: element.row_order,
        room_no: element.room_no,
        total_seats: element.total_seats,
        used_seats: element.used_seats,
        available_seats: element.available_seats,
        building_code: element.building_code,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date
      })
    }
  }
  writtenExamRoomsCourseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        written_exam_room_id: [null],
        program_schedule_id: [null],
        row_order: [0],
        room_no: [''],
        total_seats: [0],
        used_seats: [0],
        available_seats: [null],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        written_exam_room_id: element.written_exam_room_id,
        program_schedule_id: element.program_schedule_id,
        row_order: element.row_order,
        room_no: element.room_no,
        total_seats: element.total_seats,
        used_seats: element.used_seats,
        available_seats: element.available_seats,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date
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
        written_exam_announcement_date: [null],
        written_exam_announcement_time: [null],
        interview_exam_announcement_date: [null],
        interview_exam_announcement_time: [null],
        start_time: [''],
        end_time: [''],
        parent_schedule_id: [null],
        use_parent_schedule: [true],
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
        written_exam_announcement_date: element.written_exam_announcement_date,
        written_exam_announcement_time: element.written_exam_announcement_time,
        interview_exam_announcement_date: element.interview_exam_announcement_date,
        interview_exam_announcement_time: element.interview_exam_announcement_time,
        start_time: element.start_time,
        end_time: element.end_time,
        parent_schedule_id: element.parent_schedule_id,
        use_parent_schedule: element.use_parent_schedule,
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
  schedulesCourseForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_schedule_id: [0],
        program_id: [0],
        course_id: [0],
        program_course_id: [0],
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
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null],
        writtenExamRooms: this.baseFormBuilder.array([]),
        writtenExamResults: this.baseFormBuilder.array([]),
        programCourseScheduleExams: this.baseFormBuilder.array([]),

      })
    } else {
      return this.FormBuilder.group({
        program_schedule_id: element.program_schedule_id,
        program_id: element.program_id,
        course_id: element.course_id,
        program_course_id: element.program_course_id,
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
        written_exam_announcement_date: element.written_exam_announcement_date,
        written_exam_announcement_time: element.written_exam_announcement_time,
        interview_exam_announcement_date: element.interview_exam_announcement_date,
        interview_exam_announcement_time: element.interview_exam_announcement_time,
        parent_schedule_id: element.parent_schedule_id,
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
        programCourseScheduleExams: this.baseFormBuilder.array([]),
      })
    }
  }
  programCourseScheduleExamsForm(element?) {
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
  programCourseScheduleExamSubjectsForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_course_schedule_exam_subject_id: [null],
        program_course_schedule_exam_id: [null],
        exam_subject_id: [null],
        require_score: [0],
        writing_score: [0],

      })
    } else {
      return this.FormBuilder.group({
        program_course_schedule_exam_subject_id: element.program_course_schedule_exam_subject_id,
        program_course_schedule_exam_id: element.program_course_schedule_exam_id,
        exam_subject_id: element.exam_subject_id,
        require_score: element.require_score,
        writing_score: element.writing_score,
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
        writing_score: [0],

      })
    } else {
      return this.FormBuilder.group({
        program_course_schedule_exam_subject_id: element.program_course_schedule_exam_subject_id,
        program_course_schedule_exam_id: element.program_course_schedule_exam_id,
        exam_subject_id: element.exam_subject_id,
        require_score: element.require_score,
        writing_score: element.writing_score,
      })
    }
  }
  // coursesForm(element?) {
  //   console.log('array', element)
  //   if (element == undefined) {
  //     return this.FormBuilder.group({
  //       course_id: [null],
  //       course_code: [''],
  //       course_name_en: [''],
  //       course_name_th: [''],
  //       program_id: [null],
  //       faculty_id: [null],
  //       major_id: [null],
  //       application_check_flag: [true],
  //       interview_exam_flag: [true],
  //       written_exam_flag: [true],
  //       status_id: [0],
  //       create_by: [0],
  //       create_date: [null],
  //       last_update_by: [0],
  //       last_update_date: [null],
  //     })
  //   } else {
  //     return this.FormBuilder.group({
  //       course_id: element.course_id,
  //       course_code: element.course_code,
  //       course_name_en: element.course_name_en,
  //       course_name_th: element.course_name_th,
  //       program_id: element.program_id,
  //       faculty_id: element.faculty_id,
  //       major_id: element.major_id,
  //       application_check_flag: element.application_check_flag,
  //       interview_exam_flag: element.interview_exam_flag,
  //       written_exam_flag: element.written_exam_flag,
  //       status_id: element.status_id,
  //       create_by: element.create_by,
  //       create_date: element.create_date,
  //       last_update_by: element.last_update_by,
  //       last_update_date: element.last_update_date,
  //     })
  //   }
  // }
  documentProgramForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_document_id: [null],
        program_id: [null],
        program_course_id: [null],
        row_order: [0],
        document_type_id: [null],
        status_id: [0],
        create_by: [null],
        create_date: [null],
        last_update_by: [null],
        last_update_date: [null]
      })
    } else {
      return this.FormBuilder.group({
        program_document_id: element.program_document_id,
        program_id: element.program_id,
        program_course_id: element.program_course_id,
        row_order: element.row_order,
        document_type_id: element.document_type_id,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date
      })
    }
  }
  documentCourseForm(element?) {
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
        course_document_id: element.course_document_id,
        course_id: element.course_id,
        row_order: element.row_order,
        document_type_id: element.document_type_id,
        status_id: element.status_id,
        create_by: element.create_by,
        create_date: element.create_date,
        last_update_by: element.last_update_by,
        last_update_date: element.last_update_date
      })
    }
  }
  programExamSubjectsForm(element?) {
    console.log('array', element)
    if (element == undefined) {
      return this.FormBuilder.group({
        program_exam_subject_id: [null],
        program_id: [null],
        exam_subject_id: [null],
        exam_date: [null],
        exam_start_time: [null],
        exam_end_time: [null],
        full_score: [null],
      })
    } else {
      return this.FormBuilder.group({
        program_exam_subject_id: element.program_exam_subject_id,
        program_id: element.program_id,
        exam_subject_id: element.exam_subject_id,
        exam_date: element.exam_date,
        exam_start_time: element.exam_start_time,
        exam_end_time: element.exam_end_time,
        full_score: element.full_score
      })
    }
  }
  createForm() {
    return this.baseFormBuilder.group({
      program_id: [null],
      academic_year_uid: [null, [Validators.required]],
      academic_semester_uid: [null, [Validators.required]],
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
      education_type_uid: [null, [Validators.required]],
      education_type_code: [''],
      maximum_apply_course: [1],
      is_subject: [false],
      is_couse_check: [false],
      one_time_apply: [false],
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
