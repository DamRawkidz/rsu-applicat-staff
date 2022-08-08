import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/app/core/base/base-form';
import { AppService } from 'src/app/core/service/app.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ImportOhecService } from 'src/app/core/service/import-ohec.service';
import { MajorService } from 'src/app/core/service/major.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { UploadService } from 'src/app/core/service/upload.service';
import swal from 'sweetalert2'

@Component({
  selector: 'import-contact-list',
  templateUrl: './import-contact-list.component.html',
  styleUrls: ['./import-contact-list.component.scss']
})
export class ImportContactListComponent extends BaseForm implements OnInit {
  rows:any = []
  courseData:any = []
  subjectData:any = []
  programsData: any = []
  uploadFileIndex: number = 0
  @ViewChild('file') upload: ElementRef<HTMLInputElement>
  Norows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  searchInput:any = {
    course_code : '',
    display : ''
  }
  fileName : any =''
  program_schedule_id : any = ''
  majorData = []
  constructor(public router:Router,
              public FormBuilder: FormBuilder,
              public activeRoute: ActivatedRoute,
              public ProgramsService:ProgramsService,          
              public CourseService:CourseService,          
              public MajorService:MajorService,          
              public dialog:MatDialog,          
              public appSV:AppService,          
              public ImportOhecService:ImportOhecService,          
              public uploadSV:UploadService,        
              private cdRef: ChangeDetectorRef,  
    ) { super(FormBuilder,activeRoute)
      this.ProgramsService.getAll().subscribe((x: any) => {
        this.programsData = x
        this.programsData = x.map(x => {
          return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
        })
        console.log(this.programsData)
      })
      this.MajorService.getAll().subscribe((x: any) => {
        this.majorData = x
        console.log(this.majorData)
      })
    }

  ngOnInit(): void {
  }
  
  changeProgram(value){
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      console.log(x);
      this.program_schedule_id = x.schedules[0].program_schedule_id
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
    this.ImportOhecService.uploadDocumentID(formData,this.program_schedule_id).subscribe((res: any) => {
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
          this.searchInput.display = ''
        }else{
          this.fileName = res.message.succeeded[0].file_name
          this.rows = res.message.succeeded
          console.log(this.rows)
          this.searchInput.display = ''
          swal.fire({
            icon: 'success',
            text: 'Upload Success',
          })
        }
      }

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
      major_code: [null],
      prefix: [null],
      first_name_th: [''],
      last_name_th: [''],
      first_name_en: [''],
      last_name_en: [''],
      citizen_id: [null],
    })
  }
  private createFormFailed() {
    return this.baseFormBuilder.group({
      major_code: [null],
      prefix: [null],
      first_name_th: [''],
      last_name_th: [''],
      first_name_en: [''],
      last_name_en: [''],
      citizen_id: [null],
    })
  }
}
