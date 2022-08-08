import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ProgramsService } from 'src/app/core/service/programs.service';

@Component({
  selector: 'report-list-eligible-applicants-interview-list',
  templateUrl: './report-list-eligible-applicants-interview-list.component.html',
  styleUrls: ['./report-list-eligible-applicants-interview-list.component.scss']
})
export class ReportListEligibleApplicantsInterviewListComponent implements OnInit {

  searchInput = {
    programs: null,
    year: '',
    sector: '',
    course_code: '',

  }
  searchSearch = {
    programs: null,
    year: '',
    sector: '',
    course_code: '',

  }
  programsData = []
  courseData = []
  academicSemesterData = []
  academicYearData = []
  url
  constructor(
    public ProgramsService: ProgramsService,
    public AcademicYearService: AcademicYearService,
    public sanitizer: DomSanitizer,
    public AppSV: AppService,
    public Router: Router,
    public AcademicSemesterService: AcademicSemesterService,
  ) {
    this.ProgramsService.getAll().subscribe((x: any) => {
      this.programsData = x
      this.programsData = x.map(x => {
        return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
      })
      console.log(this.programsData)
    })
    this.AcademicYearService.getAll().subscribe((x: any) => {
      this.academicYearData = x
      console.log(this.academicYearData)
    })

  }
  ngOnInit(): void {
  }


  changeProgram(value) {
    console.log(value)
    this.searchSearch.programs = value.program_id
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
      })
      console.log(this.courseData)
    })
  }
  
  changeCouse(value){
    console.log(value)
    this.searchSearch.course_code = value
  }
  search() {
    // let url = `https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.course_name_start}`
    // window.open(url)
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.course_name_start}`)
    if (this.searchInput.programs == null) {
      this.AppSV.swaltAlertError('', 'กรุณาเลือกโครงการ')
    } else {
      if (this.searchInput.year == '') {
        this.AppSV.swaltAlertError('', 'กรุณาเลือกปีการศึกษา')
      } else {
        if (this.searchInput.sector == '') {
          this.AppSV.swaltAlertError('', 'กรุณาเลือกภาคการศึกษา')
        } else {
          this.AppSV.searchReport$.next(this.searchSearch)
          this.Router.navigate(['app/report_eligible_interview/list'])
          

        }
      }


    }

  }
  reSet() {
    this.searchInput = {
      programs: null,
      year: '',
      sector: '',
      course_code: '',
    }
    this.searchSearch = {
      programs: null,
      year: '',
      sector: '',
      course_code: '',
    }
  }
  changeYear(id) {
    this.searchSearch.year = id
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_id=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
  }
  change_sector(id) {
    this.searchSearch.sector = id
    console.log(id)
  }
}
