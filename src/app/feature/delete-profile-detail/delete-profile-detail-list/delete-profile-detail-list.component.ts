import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
import { ProgramsService } from 'src/app/core/service/programs.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { SchoolService } from 'src/app/core/service/school.service';
import swal from 'sweetalert2'

@Component({
  selector: 'delete-profile-detail-list',
  templateUrl: './delete-profile-detail-list.component.html',
  styleUrls: ['./delete-profile-detail-list.component.scss']
})
export class DeleteProfileDetailListComponent extends BaseList implements OnInit {
  rows: any = []
  searchInput = {
    personal_id: '',
    academic_year_id: '',
    academic_semester_id: '',
    application_status_id: '',
    program_code: '',
    course_code: '',
    first_name_th: '',
    last_name_th: '',
    school_province_name_th: '',
    school_name: '',
    apply_date: '',
  }
  educationTypesData: any = []
  applicationStatusData: any = []
  academicSemesterData: any = []
  academicYearData: any = []
  programsData: any = []
  courseData: any = []
  schoolData: any = []
  provinceData: any = []
  programDel = []
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
    this.SchoolService.getAllGemeral().subscribe((x: any) => {
      // this.schoolData = x
      this.schoolData = x.map(x => {
        return { ...x, isCheck: false, display: x.school_name_th }
      })
    })
    this.EducationTypesService.getAll().subscribe((x: any) => {
      this.educationTypesData = x
    })
    this.ProvinceService.getAllGemeral().subscribe((x: any) => {
      // this.provinceData = x
      this.provinceData = x.map(x => {
        return { ...x, isCheck: false, display: x.province_name_th }
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
    this.ApplicantApplysService.getAll().subscribe((x: any) => {
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      console.log(this.rows)
      this.rows.paginator = this.paginator;
    })
  }
  clear() {
    this.searchInput = {
      personal_id: '',
      academic_year_id: '',
      academic_semester_id: '',
      application_status_id: '',
      program_code: '',
      course_code: '',
      first_name_th: '',
      last_name_th: '',
      school_province_name_th: '',
      school_name: '',
      apply_date: '',
    }
    this.ngOnInit()
  }
  addPage(id) {
    this.router.navigate(['app/profile-detail/edit', id])
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  changeProgramDel(value, data) {
    console.log(data)
    if (value) {
      this.ApplicantService.get(data.applicant_id).pipe(
        tap(x => {
          let i = this.programDel.findIndex(x => x.applicant_id == data.applicant_id)
          if (i == -1) {
            this.programDel.push(x)
          }
        })
      ).subscribe()

    } else {
      let i = this.programDel.findIndex(x => x.applicant_id == data.applicant_id)
      this.programDel.splice(i, 1)
    }
    console.log(this.programDel);

  }
  changeProgramDelAll(value, row) {
    console.log(row.filteredData)
    if (value) {
      // this.ApplicantService.get(data.applicant_id).pipe(
      //   tap(x => {
      //     let i = this.programDel.findIndex(x => x.applicant_id == data.applicant_id)
      //     if (i == -1) {
            
      //     }
      //   })
      // ).subscribe()
      this.programDel = row.filteredData

    } else {
      this.programDel = []
    }
    console.log(this.programDel);

  }
  delApplicant() {
    if (this.programDel.length == 0) {
      this.appSV.swaltAlertError('', 'กรุณาเลือกข้อมูลที่จะทำการลบ')
    } else {
      console.log(this.programDel);

      {
        swal.getTitle()
        swal.fire({
          text: 'ยืนยันการลบรายการ',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          console.log(result)

          if (result.value) {
            this.ApplicantService.delete(this.programDel).pipe(
              catchError(err => {
                // alert ตรงนี่
                this.appSV.swaltAlertError('', 'Error')
                return throwError(err)
              })).subscribe((x: any) => {
                console.log(x)
                this.ngOnInit()
                this.appSV.swaltAlert('','ลบข้อมูลสำเร็จ')
              })


          }
        })
      }
    }
  }
  changeProvice(value) {
    console.log(value)
    this.SchoolService.queryGemeral(`?province_name_th=${value}`).subscribe((x: any) => {
      this.schoolData = x.map(x => {
        return { ...x, isCheck: false, display: x.school_name_th }
      })
      console.log(this.schoolData)
    })
  }
  changeProgram(value) {
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
      })
      console.log(this.courseData)
    })
    this.searchInput.course_code = ''
  }
  inputProgram(value) {
    if (value == '') {
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
  del() {

  }
}
