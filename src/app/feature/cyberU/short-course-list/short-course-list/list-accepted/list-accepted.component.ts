import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import { CourseService } from 'src/app/core/service/course.service';

@Component({
  selector: 'list-accepted',
  templateUrl: './list-accepted.component.html',
  styleUrls: ['./list-accepted.component.scss']
})
export class ListAcceptedComponent implements OnInit {
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
    {'application_id':'02112565001','first_name_th':'นายอดิศร ศรีสุธรรม','course':'Happiness Mastery 30 วัน','program_code':'คณะบัญชี','fee':'5,900.00','date':'10/02/2565','application_status_name_th':'รอรับเข้า'},
    {'application_id':'02112565001','first_name_th':'นายอดิศร ศรีสุธรรม','course':'Happiness Mastery 30 วัน','program_code':'คณะบัญชี','fee':'5,900.00','date':'10/02/2565','application_status_name_th':'รอรับเข้า'},

  ]
  constructor(
    public CourseService: CourseService,
    public ApplicationStatusService: ApplicationStatusService,
    public router: Router,
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
      case 'รอลงทะเบียน':
          return 'text_primary'
        
    
      case 'ชำระค่าลงทะเบียนแล้ว':
        return 'text_info'
        
    
      case 'รอส่งเอกสาร':
        return 'text_danger'

      case 'ลงทะเบียนแล้ว':
        return 'text_success'
        
    
    
    }
  }
  addPage() {
    this.router.navigate(['app/short-course-list/add'])
  }
}
