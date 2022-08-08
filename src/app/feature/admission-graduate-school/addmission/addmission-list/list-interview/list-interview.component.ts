import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import { CourseService } from 'src/app/core/service/course.service';

@Component({
  selector: 'list-interview',
  templateUrl: './list-interview.component.html',
  styleUrls: ['./list-interview.component.scss']
})
export class ListInterviewComponent implements OnInit {
  courseData: any = []
  applicationStatusData: any = []
  searchInput = {
    personal_id: '',
    academic_year_id:'',
    academic_semester_id:'',
    application_status_id:'',
    program_code:'',
    course_code:'',
    first_name_th:'',
    last_name_th:'',
    school_province_name_th:'',
    school_name:'',
    apply_date:'',
    mobile:'',
  }
  rows = [
    {'application_id':'02112565001','first_name_th':'นายอดิศร ศรีสุธรรม','course':'สาขาภาษาอังกฤษ คณะศิลปศาสตร์ ปริญญาตรี (ไทย)','program_code':'สมัครเรียนระดับบัณฑิตศึกษา','date':'10/02/2565','application_status_name_th':'ยืนยันวันสัมภาษณ์'},
    {'application_id':'02112565001','first_name_th':'นายอดิศร ศรีสุธรรม','course':'สาขาภาษาอังกฤษ คณะศิลปศาสตร์ ปริญญาตรี (ไทย)','program_code':'สมัครเรียนระดับบัณฑิตศึกษา','date':'10/02/2565','application_status_name_th':'รอพิจารณารับเข้า'},
    // {'application_id':'02112565001','first_name_th':'นายอดิศร ศรีสุธรรม','course':'สาขาภาษาอังกฤษ คณะศิลปศาสตร์ ปริญญาตรี (ไทย)','program_code':'สมัครเรียนระดับบัณฑิตศึกษา','date':'10/02/2565','application_status_name_th':'รอแก้ไขเอกสาร'},

  ]
  constructor(
    public CourseService: CourseService,
    public ApplicationStatusService: ApplicationStatusService,
  ) {
    this.CourseService.getAll().subscribe((x: any) => {
      this.courseData = x
      this.courseData = x.map(x => {
        return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
      })
    })
    this.ApplicationStatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.applicationStatusData = x
    })
   }

  ngOnInit(): void {
  }

  textClass(el){
    switch (el) {
      case 'ยืนยันวันสัมภาษณ์':
          return 'text_primary'
        
    
      case 'รอพิจารณารับเข้า':
        return 'text_success'
        
    
    
    
    }
  }
}
