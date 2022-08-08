import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantInterviewService } from 'src/app/core/service/applicant-interview.service';
import { CourseService } from 'src/app/core/service/course.service';
import { InterviewResuleProcessService } from 'src/app/core/service/interview-resule-process.service';
import { InterviewResuleUploadService } from 'src/app/core/service/interview-resule-upload.service';
import { InterviewStatusService } from 'src/app/core/service/interview-status.service';
import { ProgramCouresService } from 'src/app/core/service/program-coures.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import swal from 'sweetalert2'

@Component({
  selector: 'confirm-admission-list',
  templateUrl: './confirm-admission-list.component.html',
  styleUrls: ['./confirm-admission-list.component.scss']
})
export class ConfirmAdmissionListComponent implements OnInit {
  searchInput = {
    academic_year_id : null,
    academic_semester_id : null,
    program_code : '',
    course_code : '',
    display : '',
    displayCourse : '',
    schedule: '',
  }
  academicYearData = []
  academicSemesterData = []
  courseData = []
  programsData: any = []
  rows: any = []
  rowsShow: any = {}
  program_schedule_id : any = ''
  program_schedule_course_id : any = ''
  program_schedule_code : any = ''
  program_course_id : any = ''
  program_id : any = ''
  interviewStatusData = []
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  courseSchedules = []
  constructor(
    public AcademicYearService:AcademicYearService,
    public AcademicSemesterService:AcademicSemesterService,
    public CourseService:CourseService,
    public ProgramsService:ProgramsService,
    public InterviewStatusService:InterviewStatusService,
    public InterviewResuleUploadService:InterviewResuleUploadService,
    public InterviewResuleProcessService:InterviewResuleProcessService,
    public AppSV:AppService,
    private cdRef: ChangeDetectorRef,  
    public ApplicantInterviewService:ApplicantInterviewService,
    public ProgramCouresService:ProgramCouresService,
  ) { 
    this.AcademicYearService.getAll().subscribe((x: any) => {
      this.academicYearData = x
    })
    this.InterviewStatusService.getAll().subscribe((x: any) => {
      this.interviewStatusData = x
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

  selectFile() {
    // this.uploadFileIndex = index
    this.upload.nativeElement.click()
  }
  uplodaFile(file: FileList) {
    const formData: FormData = new FormData();
    formData.append('file', file.item(0), file.item(0).name)
    this.InterviewResuleUploadService.uploadDocument(formData).subscribe((res: any) => {
      console.log(res)
      if (res.status == 'progress') {
        // this.getFormDocuments.at(this.uploadFileIndex).patchValue({
        //   'progress': res.message
        // })
        this.cdRef.detectChanges()
      }
      if (res.status == 'success') {
        if(res.message.succeeded.length == 0){
          this.AppSV.swaltAlertError('','ไม่มีข้อมูลที่นำเข้าได้')
          // this.fileName = res.message.failed[0].file_name
        }else{
          // this.fileName = res.message.succeeded[0].file_name
          this.rows = res.message
          console.log(res.message.succeeded)
          res.message.succeeded.forEach((element,i) => {
            let index =  this.rowsShow.program_schedule_interviews.findIndex(x=>x.application_id == element.application_id)
            console.log(index)
            console.log(res.message.succeeded[index].result == 'P')
            if(res.message.succeeded[index].result == 'P'){
              this.rowsShow.program_schedule_interviews[index].interview_status_id =  1 
            }else if(res.message.succeeded[index].result == 'N'){
              this.rowsShow.program_schedule_interviews[index].interview_status_id =  3
            } else{
              this.rowsShow.program_schedule_interviews[index].interview_status_id =  2
            }
            
          });
          console.log(this.rowsShow.program_schedule_interviews)

          swal.fire({
            icon: 'success',
            text: 'Upload Success',
          })
        }
        // this.getFormDocuments.at(this.uploadFileIndex).patchValue({
        //   document_url: url
        // })
        this.cdRef.detectChanges()
        // console.log(this.form.getRawValue())
       
        // this._snackBar.open('Upload Success','',{
        //   duration: 1000 
        // })
      }

    })
  }
  changeAcdemiYear(value){
    console.log(value)
    this.AcademicSemesterService.query(`${value.academic_year_id}`).subscribe((x: any) => {
      console.log(x);
      
      this.academicSemesterData = x
      console.log(this.academicSemesterData)
    })
   }
   changeProgram(value){
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      console.log(x)
      this.program_schedule_code = x.schedules[0].program_schedule_code
      this.program_schedule_id = x.schedules[0].program_schedule_id
      this.program_id = x.program_id
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
      })
      console.log(this.courseData)
    })
    // this.ProgramCouresService.query(`${value.program_id}`).subscribe((c: any) => {
    //   console.log(c)
    //   this.courseData = c.map(x => {
    //       return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
    //     })
    // })
  }
   inputProgram(value){
    if(value == ''){
      this.CourseService.getAll().subscribe((x: any) => {
        this.courseData = x
        this.courseData = x.map(x => {
          return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
        })
      })
    }
  }
  selectCourse(data){
    console.log(data)
    this.program_course_id = data.program_course_id
    this.ProgramCouresService.getDate(data.program_course_id).pipe(
      tap((x:any)=>{
        console.log(x)
        this.courseSchedules = x.courseSchedules
      })
    ).subscribe()
    
  }
  selectSchedules(data){
    console.log(data)
    this.program_schedule_course_id = data.program_schedule_id
    // this.courseSchedules = data.courseSchedules
  }
  search(){
    console.log(this.program_schedule_course_id)
    if(this.searchInput.display){
      this.ApplicantInterviewService.query(`interview/${this.program_schedule_course_id}`).subscribe((interview: any) => {
        console.log(interview)
        this.rowsShow = interview
        if(this.rowsShow.program_schedule_interviews.length == 0){
          this.AppSV.swaltAlertError('','ไม่มีข้อมูล')
        }
        this.searchInput.display = ''
        this.searchInput.displayCourse = ''
        this.searchInput.schedule = ''
      })
    }else{
      this.AppSV.swaltAlertError('','กรุณาเลือกโครงการ')
    }
    
  }
  clear(){
    this.searchInput.display = ''
    this.searchInput.displayCourse = ''
    this.searchInput.schedule = ''
    this.rowsShow = {}
    this.program_id = ''
    this.program_schedule_code = ''
  }
  changeStatus(status,data,i){
    console.log(status)
    data.interview_status_id = status
    if(status == 1){
      this.rows[i].result = 'P'
    }else if(status == 2){
      this.rows[i].result = 'R'
    }else{
      this.rows[i].result = 'N'
    }
    
  }
  save(data){
    console.log(data)
    // data.program_schedule_interviews.forEach(element => {
    //   element.program_schedule_interview_subjects = null
    // });

    // this.InterviewResuleProcessService.put(this.rows).pipe(
    //   catchError(err => {
    //     // alert ตรงนี่
    //     this.AppSV.swaltAlertError('', 'Error')
    //     return throwError(err)
    //   })).subscribe(x=>{
    //     console.log(x)
    // })


    this.ApplicantInterviewService.updateInterView(data).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.AppSV.swaltAlertError('', 'Error')
        return throwError(err)
      })).subscribe(x=>{
        console.log(x)
        this.rowsShow = {}
        this.AppSV.swaltAlert()
    })
  }
}
