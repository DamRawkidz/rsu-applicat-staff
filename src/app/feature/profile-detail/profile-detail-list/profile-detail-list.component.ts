import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from 'src/app/core/service/applicant.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { BaseList } from 'src/app/core/base/base-list';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppService } from 'src/app/core/service/app.service';
import { EducationTypesService } from 'src/app/core/service/education-types.service';
import { ApplicationStatusService } from 'src/app/core/service/application-status.service';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { SchoolService } from 'src/app/core/service/school.service';
import { EducationService } from 'src/app/core/service/education.service';
import swal from 'sweetalert2'

@Component({
  selector: 'profile-detail-list',
  templateUrl: './profile-detail-list.component.html',
  styleUrls: ['./profile-detail-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailListComponent extends BaseList implements OnInit {
  rows: any = []
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
  educationTypesData: any = []
  applicationStatusData: any = []
  academicSemesterData: any = []
  academicYearData: any = []
  programsData: any = []
  courseData: any = []
  schoolData: any = []
  provinceData: any = []
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
  ) {
    super()
    this.ApplicationStatusService.getAll().subscribe((x: any) => {
      console.log(x)
      this.applicationStatusData = x
    })
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
    // this.AcademicSemesterService.getAll().subscribe((x: any) => {
    //   this.academicSemesterData = x
    // })
  
  }

  ngOnInit(): void {
    // this.ApplicantApplysService.getAll().subscribe((x: any) => {
    //   this.rows = x
    //   this.rows = this.rows.filter(x=>x.application_status_id != 1)
    //   this.rows = new MatTableDataSource(this.rows);
    //   this.rows.sort = this.sort
    //   console.log(this.rows)
    //   // this.rows.paginator = this.paginator;
    // })
  }
  clear(){
    this.searchInput = {
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
    this.rows = []
  }
  addPage(id) {
    this.router.navigate(['app/profile-detail/edit',id])
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
    changeYear(id) {
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_id=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
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
  createQueryStringFromObject = (object: any):string => {
    let queryStr: string = ''

    for (const key in object) {
        if (object[key]) {
            queryStr += `${key}=${object[key]}&`        
        }
    }
    let lastIndex = queryStr.lastIndexOf('&')
    queryStr = queryStr.slice(0,lastIndex)
    return queryStr
}
  search() {

    swal.fire({
      title: 'Please Wait !',
      html: 'data uploading',// add html attribute if you want or remove
      allowOutsideClick: false,
      onBeforeOpen: () => {
          swal.showLoading()
      },
  });
    
    let queryString = this.createQueryStringFromObject(this.searchInput)
    console.log(queryString)
    this.ApplicantApplysService.query(`?${queryString}`).pipe(
      catchError(err => {
        // alert ตรงนี่
        this.appSV.swaltAlertError('', 'ไม่พบข้อมูลผู้สมัคร')
        swal.close();
        return throwError(err)
      })
    ).subscribe((x: any) => {
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      swal.close();
      this.rows.paginator = this.paginator;
    })
  }
}
