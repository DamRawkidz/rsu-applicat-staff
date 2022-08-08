import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { ProvinceService } from 'src/app/core/service/province.service';
import { SchoolService } from 'src/app/core/service/school.service';

@Component({
  selector: 'report-list-applicants-school-province-search',
  templateUrl: './report-list-applicants-school-province-search.component.html',
  styleUrls: ['./report-list-applicants-school-province-search.component.scss']
})
export class ReportListApplicantsSchoolProvinceSearchComponent implements OnInit {
  provinces = []
  searchInput = {
    programs : null,
    year : '',
    sector : '',
    // province_name_start : '',
    // province_name_end : '',
    // school_name_start : '',
    // school_name_end : '',
  }
  searchSearch = {
    programs : null,
    year : '',
    sector : '',
    // province_name_start : '',
    // province_name_end : '',
    // school_name_start : '',
    // school_name_end : '',
  }
  programsData = []
  courseData = []
  academicSemesterData = []
  academicYearData = []
  url
  constructor(
    public ProgramsService :ProgramsService,
    public AcademicYearService :AcademicYearService,
    public sanitizer :DomSanitizer,
    public AppSV :AppService,
    public Router :Router,
    public AcademicSemesterService :AcademicSemesterService,
    private provinceSV: ProvinceService,
    private SchoolSV: SchoolService,
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


  changeProgram(value){
    console.log(value)
    this.searchSearch.programs = value.program_id
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
      })
      console.log(this.courseData)
    })
  }
  search(){
    // let url = `https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.province_name_start}`
    // window.open(url)
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.province_name_start}`)
    if(this.searchInput.programs == null){
      this.AppSV.swaltAlertError('','กรุณาเลือกโครงการ')
    }else{
      this.AppSV.searchReport$.next(this.searchSearch)
      this.Router.navigate(['app/report_summary_province_school/list'])
    }

  }
  inputprovinceStart(value){
    console.log(value)
    this.provinceSV.queryGemeral(`?province_name_th=${value}`).subscribe((x:any)=>this.provinces = [...x])
  }
  reSet(){
    this.searchInput = {
      programs : null,
      year : '',
      sector : '',
      // province_name_start : '',
      // province_name_end : '',
      // school_name_start : '',
      // school_name_end : '',
    }
    this.searchSearch = {
      programs : null,
      year : '',
      sector : '',
      // province_name_start : '',
      // province_name_end : '',
      // school_name_start : '',
      // school_name_end : '',
    }
  }
  changeYear(id) {
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_id=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
  }
}
