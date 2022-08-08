import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseList } from 'src/app/core/base/base-list';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import { CourseService } from 'src/app/core/service/course.service';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { EducationService } from 'src/app/core/service/education.service';
import { PermissiomService } from 'src/app/core/service/permissiom.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { SchoolService } from 'src/app/core/service/school.service';

@Component({
  selector: 'profile-detail-faculty-list',
  templateUrl: './profile-detail-faculty-list.component.html',
  styleUrls: ['./profile-detail-faculty-list.component.scss']
})
export class ProfileDetailFacultyListComponent extends BaseList implements OnInit {
  rows: any = []
  rowsFac: any = []
  searchInput = {
    personal_id: '',
    academic_year_id:'',
    academic_semester_id:'',
    application_status_id:1,
    program_code:'',
    course_code:'',
    first_name_th:'',
    last_name_th:'',
    school_province_name_th:'',
    school_name:'',
    apply_date:'',
    faculty_code : '12'
  }
  educationTypesData: any = []
  applicationStatusData: any = []
  academicSemesterData: any = []
  academicYearData: any = []
  programsData: any = []
  courseData: any = []
  schoolData: any = []
  provinceData: any = []
  role: any = []

  channel: BroadcastChannel

  constructor(public router: Router,
    public ApplicantService: ApplicantService,
    public appSV: AppService,
    public EducationTypesService: EducationTypesService,
    public ApplicationStatusService: ApplicationStatusService,
    public AcademicSemesterService: AcademicSemesterService,
    public AcademicYearService: AcademicYearService,
    public ProgramsService: ProgramsService,
    public CourseService: CourseService,
    public ProvinceService: ProvinceService,
    public EducationService: EducationService,
    public SchoolService: SchoolService,
    public ApplicantApplysService: ApplicantApplysService,
    public PermissiomService: PermissiomService,
  ) {
    super()
    this.SchoolService.getAllGemeral().subscribe((x: any) => {
      // this.schoolData = x
      this.schoolData = x.map(x => {
        return { ...x, isCheck: false, display: x.school_name_th  }
      })
    })
    this.EducationTypesService.getAll().subscribe((x: any) => {
      this.educationTypesData = x
    })
    this.ProvinceService.getAllGemeral().subscribe((x: any) => {
      // this.provinceData = x
      this.provinceData = x.map(x => {
        return { ...x, isCheck: false, display: x.province_name_th  }
      })
    })
    this.CourseService.getAll().subscribe((x: any) => {
      this.courseData = x
      this.courseData = x.map(x => {
        return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
      })
    })
    this.ProgramsService.getAll().subscribe((x: any) => {
      this.programsData = x
      this.programsData = x.map(x => {
        return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
      })
      console.log(this.programsData)
    })
    this.AcademicYearService.getAll().subscribe((x: any) => {
      this.academicYearData = x
    })
    this.AcademicSemesterService.getAll().subscribe((x: any) => {
      this.academicSemesterData = x 
    })
    this.ApplicationStatusService.getAll().subscribe((x: any) => {
      this.applicationStatusData = x
    })
  }

  ngOnInit(): void {
    // this.channel = new BroadcastChannel('rsu_staff')

    // this.channel.onmessage = (event) => {
    //   console.log(event)
    // }

    // this.ApplicantApplysService.getAll().subscribe((x: any) => {
    //   this.rows = x
    //   this.rows = this.rows.filter(x=>x.application_status_id == 1)
    //   this.rowsFac = this.rows.filter(x=>x.faculty_code == '12')
    //   this.rows = new MatTableDataSource(this.rows);
    //   this.rows.sort = this.sort
    //   console.log(this.rows)
    //   console.log(this.rowsFac)
    //   // this.rows.paginator = this.paginator;
    // })

    // this.PermissiomService.getAll().subscribe((x:any)=>{
    //   console.log(x)
    //   if(x.object_permissions){
    //     this.role =  x.object_permissions
    //   }else{
    //     this.role =  x.data_permissions
    //   }
    //   console.log(this.role)
    // })
  }
  clear(){

    // this.channel.postMessage('call from anothen tab')

    this.searchInput = {
      personal_id: '',
      academic_year_id:'',
      academic_semester_id:'',
      application_status_id:1,
      program_code:'',
      course_code:'',
      first_name_th:'',
      last_name_th:'',
      school_province_name_th:'',
      school_name:'',
      apply_date:'',
      faculty_code : '12'
    }
    this.rows = []
    // this.ngOnInit()
  }
  addPage(id) {
    this.router.navigate(['app/profile_detail_fac/edit',id])
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  changeProvice(value){
    console.log(value)
    this.SchoolService.queryGemeral(`?province_name_th=${value}`).subscribe((x: any) => {
      this.schoolData = x.map(x => {
        return { ...x, isCheck: false, display: x.school_name_th  }
      })
      console.log(this.schoolData)
    })
  }
  changeProgram(value){
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
      })
      console.log(this.courseData)
    })
    this.searchInput.course_code = ''
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
  search() {
    console.log(this.searchInput)
    this.ApplicantApplysService.query(`?personal_id=${this.searchInput.personal_id}&academic_year_id=${this.searchInput.academic_year_id}&academic_semester_id=${this.searchInput.academic_semester_id}&application_status_id=${this.searchInput.application_status_id}&program_code=${this.searchInput.program_code}&course_code=${this.searchInput.course_code}&first_name_th=${this.searchInput.first_name_th}&last_name_th=${this.searchInput.last_name_th}&school_province_name_th=${this.searchInput.school_province_name_th}&school_name=${this.searchInput.school_name}&apply_date=${this.searchInput.apply_date}`).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'ไม่พบข้อมูลผู้สมัคร')
        return throwError(err)
      })
    ).subscribe((x: any) => {
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      // this.rows.paginator = this.paginator;
    })
  }
}
