import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantInterviewUploadService } from 'src/app/core/service/applicant-interview-upload.service';
import { ApplicantInterviewService } from 'src/app/core/service/applicant-interview.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ProgramCoureSService } from 'src/app/core/service/program-coure-s.service';
import { ProgramCouresService } from 'src/app/core/service/program-coures.service';
import { ProgramScheduleService } from 'src/app/core/service/program-schedule.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { UploadService } from 'src/app/core/service/upload.service';
import { PreviewDocComponent } from 'src/app/shared/components/preview-doc/preview-doc.component';
import swal from 'sweetalert2'

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  searchInput = {
    academic_year_id : null,
    academic_semester_id : null,
    program_code : '',
    course_code : '',
    display : '',
  }
  academicYearData = []
  academicSemesterData = []
  courseData = []
  programsData: any = []
  rows: any = []
  uploadFileIndex: number = 0
  program_schedule_id : any = ''
  program_schedule_code : any = ''
  program_schedule_course_id : any = ''
  program_id : any = ''
  constructor(
    public AcademicYearService:AcademicYearService,
    public AcademicSemesterService:AcademicSemesterService,
    public CourseService:CourseService,
    public uploadSV:UploadService,
    private cdRef: ChangeDetectorRef,
    private AppSV: AppService,
    public ProgramsService:ProgramsService,
    private dialog: MatDialog,
    public ApplicantInterviewService:ApplicantInterviewService,
    public ProgramCouresService:ProgramCoureSService,
    public ProgramScheduleService:ProgramScheduleService,
    public ApplicantInterviewUploadService:ApplicantInterviewUploadService,

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
    this.program_schedule_code = x.schedules[0].program_schedule_code
    this.program_schedule_id = x.schedules[0].program_schedule_id
    this.program_id = x.program_id
    // this.courseData = x.programCourses.map(x => {
    //   return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
    // })
    // console.log(this.courseData)
  })
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

selectFile(id: number) {
  // this.uploadFileIndex = index
  this.program_schedule_course_id = id
  this.upload.nativeElement.click()
}
uplodaFile(file: FileList) {
  const formData: FormData = new FormData();
  formData.append('file', file.item(0), file.item(0).name)
  this.ApplicantInterviewUploadService.uploadDocumentID(formData,this.program_schedule_course_id).subscribe((res: any) => {
    if (res.status == 'progress') {
      // this.getFormDocuments.at(this.uploadFileIndex).patchValue({
      //   'progress': res.message
      // })
      this.cdRef.detectChanges()
    }
    if (res.status == 'success') {
      console.log(res)
      // let url: string = res.message[0].file_name
      // this.getFormDocuments.at(this.uploadFileIndex).patchValue({
      //   document_url: url
      // })
      this.cdRef.detectChanges()
      // console.log(this.form.getRawValue())
      this.ProgramScheduleService.query(this.program_schedule_id).subscribe((interview: any) => {
        console.log(interview)
        this.rows = interview
        swal.fire({
          icon: 'success',
          text: 'Upload Success',
        })
      })

      // this._snackBar.open('Upload Success','',{
      //   duration: 1000 
      // })
    }

  })
}
_previewDoc(url: string) {
  // this.onPreviewDoc.emit(url)
  const dialogRef = this.dialog.open(PreviewDocComponent, {
    width: '50vw',
    height: '50vh',
    data: url
  })

  dialogRef.afterClosed().subscribe(res => {
    console.log('The dialog was closed');
  })
}
search(){

  if(this.searchInput.display){
    this.ProgramScheduleService.query(this.program_schedule_id).subscribe((c: any) => {
      console.log(c)
      this.rows = c
      this.searchInput.display = ''
    })
  }else{
    this.AppSV.swaltAlertError('','กรุณาเลือกโครงการ')
  }
  
}
clear(){
  this.searchInput.display = ''
  this.rows = []
  this.program_id = ''
  this.program_schedule_code = ''
}
save(data){
  this.ProgramScheduleService.put(data).pipe(
    catchError(err => {
      // alert ตรงนี่
      this.AppSV.swaltAlertError('', 'Error')
      return throwError(err)
    })).subscribe((c: any) => {
    console.log(c)
    this.AppSV.swaltAlert('','บันทึกสำเร็จ')
  })
}

}
