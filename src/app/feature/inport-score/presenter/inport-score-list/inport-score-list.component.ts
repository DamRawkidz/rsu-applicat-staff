import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from 'src/app/core/base/base-form';
import { AppService } from 'src/app/core/service/app.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ExamScoreService } from 'src/app/core/service/exam-score.service';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { UploadService } from 'src/app/core/service/upload.service';
import swal from 'sweetalert2'
import { PopupEditScoreComponent } from '../popup-edit-score/popup-edit-score.component';

@Component({
  selector: 'inport-score-list',
  templateUrl: './inport-score-list.component.html',
  styleUrls: ['./inport-score-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InportScoreListComponent extends BaseForm implements OnInit {
  rows:any = []
  courseData:any = []
  subjectData:any = []
  programsData: any = []
  examData: any = []
  uploadFileIndex: number = 0
  fileName: any
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  Norows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  searchInput:any = {
    course_code : ''
  }
  constructor(public router:Router,
              public FormBuilder: FormBuilder,
              public activeRoute: ActivatedRoute,
              public ProgramsService:ProgramsService,          
              public CourseService:CourseService,          
              public ExamSubjectsService:ExamSubjectsService,          
              public dialog:MatDialog,          
              public appSV:AppService,          
              public uploadScoreSV:ExamScoreService,        
              private cdRef: ChangeDetectorRef,  
    ) { super(FormBuilder,activeRoute)
      this.ProgramsService.getAll().subscribe((x: any) => {
        this.programsData = x
        this.programsData = x.map(x => {
          return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
        })
        })
      this.ExamSubjectsService.getAll().subscribe((x: any) => {
        this.examData = x
       
        console.log(this.examData)
      })
    }

  ngOnInit(): void {
  }
  
  changeProgram(value){
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      console.log(x);
      
      this.subjectData = x.programExamSubjects.map(x => {
        return { ...x, isCheck: false, display: x.exam_subject_code+'-'+x.exam_subject_name_th  }
      })
      console.log(this.subjectData)
    })
    // this.searchInput.course_code = ''
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

  selectFile() {
    // this.uploadFileIndex = index
    this.upload.nativeElement.click()
  }
  uplodaFile(file: FileList) {
    const formData: FormData = new FormData();
    formData.append('file', file.item(0), file.item(0).name)
    this.uploadScoreSV.uploadDocument(formData).subscribe((res: any) => {
      console.log(res)
      if (res.status == 'progress') {
        // this.getFormDocuments.at(this.uploadFileIndex).patchValue({
        //   'progress': res.message
        // })
        this.cdRef.detectChanges()
      }
      if (res.status == 'success') {
        if(res.message.succeeded.length == 0){
          this.appSV.swaltAlertError('','ไม่มีข้อมูลที่นำเข้าได้')
          this.fileName = res.message.failed[0].file_name
        }else{
          this.fileName = res.message.succeeded[0].file_name
          this.rows = res.message.succeeded
          console.log(this.rows)
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
 openPopUpEditScore() {
    const dialogRef = this.dialog.open(
      PopupEditScoreComponent, {
      width: '70%',
      // height: '100%',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
  createForm() {
    return this.baseFormBuilder.group({
      succeeded: this.createFormSucceeded(),
      failed: this.createFormFailed()
    })
  }

  private createFormSucceeded() {
    return this.baseFormBuilder.group({
      applicant_exam_score_id: [null],
      file_id: [null],
      file_name: [''],
      program_id: [null],
      program_schedule_id: [null],
      exam_subject_id: [null],
      applicant_apply_id: [null],
      program_code: [''],
      subject_code: [''],
      exam_seat_no: [''],
      score: [0],
      is_success: [true],
      create_by: [null],
      import_status_id: [null],
      applicant_name: [null],
      import_status_description: [null],
      create_datetime: [null],
      last_update_by: [null],
      last_update_datetime: [null],
    })
  }
  private createFormFailed() {
    return this.baseFormBuilder.group({
      applicant_exam_score_id: [null],
      file_id: [null],
      file_name: [''],
      program_id: [null],
      program_schedule_id: [null],
      exam_subject_id: [null],
      applicant_apply_id: [null],
      program_code: [''],
      subject_code: [''],
      exam_seat_no: [''],
      score: [0],
      is_success: [true],
      import_status_id: [null],
      applicant_name: [null],
      import_status_description: [null],
      create_by: [null],
      create_datetime: [null],
      last_update_by: [null],
      last_update_datetime: [null],
    })
  }
}
