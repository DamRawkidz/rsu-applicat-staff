import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantInterviewService } from 'src/app/core/service/applicant-interview.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ProgramCoureSService } from 'src/app/core/service/program-coure-s.service';
import { ProgramCouresService } from 'src/app/core/service/program-coures.service';
import { ProgramScheduleService } from 'src/app/core/service/program-schedule.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { ProcessPopupComponent } from '../process-popup/process-popup.component';


@Component({
  selector: 'process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {
  searchInput = {
    academic_year_id: null,
    academic_semester_id: null,
    program_code: '',
    course_code: '',
    display: '',
  }
  academicYearData = []
  academicSemesterData = []
  courseData = []
  programsData: any = []
  rows: any = []
  program_schedule_code: any = ''
  program_schedule_id: any = ''
  program_id: any = ''

  show = false
  updateShow = false
  constructor(
    public AcademicYearService: AcademicYearService,
    public AcademicSemesterService: AcademicSemesterService,
    public CourseService: CourseService,
    public dialog: MatDialog,
    public AppSV: AppService,
    public ProgramsService: ProgramsService,
    public ApplicantInterviewService: ApplicantInterviewService,
    public ProgramCouresService: ProgramCouresService,
    public ProgramScheduleService: ProgramScheduleService,
    public ProgramCoureSService: ProgramCoureSService,
  ) {
    this.AcademicYearService.getAll().subscribe((x: any) => {
      this.academicYearData = x
    })
    this.ProgramsService.getAll().subscribe((x: any) => {
      this.programsData = x
      this.programsData = x.map(x => {
        return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
      })
      console.log(this.programsData)
    })
  }

  ngOnInit(): void {
  }
  changeAcdemiYear(value) {
    console.log(value)
    this.AcademicSemesterService.query(`${value.academic_year_id}`).subscribe((x: any) => {
      console.log(x);

      this.academicSemesterData = x
      console.log(this.academicSemesterData)
    })
  }
  changeProgram(value) {
    console.log(value)
    // console.log(this.searchInput.program_code)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      console.log(x)
      this.program_schedule_code = x.schedules[0].program_schedule_code
      this.program_schedule_id = x.schedules[0].program_schedule_id
      this.program_id = x.program_id


    })
  }
  //  inputProgram(value){
  //   if(value == ''){
  //     this.CourseService.getAll().subscribe((x: any) => {
  //       this.courseData = x
  //       this.courseData = x.map(x => {
  //         return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
  //       })
  //     })
  //   }
  // }
  openPopUp(interview) {

      this.ApplicantInterviewService.query(`applicant/${this.program_id}/${this.program_schedule_id}`).subscribe((applicant: any) => {
        console.log(applicant)

        const dialogRef = this.dialog.open(
          ProcessPopupComponent, {
          width: '70%',
          // height: '100%',
          data: applicant  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
        }
        )

        dialogRef.afterClosed().subscribe(callback => {
          console.log(callback)
          callback.forEach(element => {
            interview.program_schedule_interviews.splice(0,0,element)  
          });
          
          
        })
      })





  }
  search() {

    if (this.searchInput.display) {
      console.log(this.program_id)
      console.log(this.program_schedule_code)
      // this.ApplicantInterviewService.query(`process/${this.program_id}/${this.program_schedule_code}`).subscribe((interview: any) => {
      //   console.log(interview)
      //   this.rows = interview
      // })
      this.ProgramScheduleService.query(this.program_schedule_id).subscribe((c: any) => {
        console.log(c)
        this.rows = c
        this.searchInput.display = ''
      })
    } else {
      this.AppSV.swaltAlertError('', 'กรุณาเลือกโครงการ')
    }

  }
  clear() {
    this.searchInput.display = ''
    this.rows = []
    this.program_id = ''
    this.program_schedule_code = ''
    this.show = false
  } 
  checkAmount(data, value) {
    data.interview_amount = Number(value)
  }
  a() {
    console.log(this.rows);
    this.ProgramScheduleService.put(this.rows).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.AppSV.swaltAlertError('', 'Error')
        return throwError(err)

      
      }),
      tap(x=>{
        console.log(x)
        // this.AppSV.swaltAlert()
      }),
      concatMap(x=>this.getProcess())
      ).subscribe((interview:any) => {
        console.log(interview)
        if(interview.length == 0){
          this.AppSV.swaltAlertError('','ไม่มีข้อมูล')
          this.rows = []
          this.show = false
        }else{
          this.rows = interview
          this.show = true
        }
      })
   

  }
  getProcess(){
   return this.ApplicantInterviewService.query(`process/${this.program_id}/${this.program_schedule_id}`).pipe(
      tap((interview:any)=>{
        
      })
    )
  }
  saveInterView(course) {
    console.log(course)
    this.ApplicantInterviewService.add(course).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.AppSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe(x => {
        console.log(x)
        this.updateShow = x.is_interview_save
        this.AppSV.swaltAlert()
      })
  }
  updateInterview(course){
    console.log(course)
    this.ApplicantInterviewService.put(course).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.AppSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe(x => {
        console.log(x)
        this.AppSV.swaltAlert()
      })
  }
  approveInterView(data) {
    console.log(data)
    this.ApplicantInterviewService.approveInterView(data.program_schedule_id, data).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.AppSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe(x => {
        console.log(x)
        this.AppSV.swaltAlert('','อนุมัติสำเร็จแล้ว')
      })
  }
}
