import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ProgramsService } from 'src/app/core/service/programs.service';

@Component({
  selector: 'student-total-apply-online',
  templateUrl: './student-total-apply-online.component.html',
  styleUrls: ['./student-total-apply-online.component.scss']
})
export class StudentTotalApplyOnlineComponent implements OnInit {
  searchInput = {
    programs : null,
    year : '',
    sector : '',
    course_name_start : '',
    course_name_end : '',
  }
  searchSearch = {
    programs : null,
    year : '',
    sector : '',
    course_name_start : '',
    course_name_end : '',
  }
  programsData = []
  courseData = []
  academicSemesterData = []
  academicYearData = []
  url
  constructor(
    public ProgramsService :ProgramsService,
    public AcademicYearService :AcademicYearService,
    public CourseService :CourseService,
    public sanitizer :DomSanitizer,
    public AppSV :AppService,
    public Router :Router,
    public AcademicSemesterService :AcademicSemesterService,
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
    this.reSet()
  }

  search(){
    // let url = `https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.course_name_start}`
    // window.open(url)
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.course_name_start}`)
    if(this.searchInput.programs == null){
      this.AppSV.swaltAlertError('','กรุณาเลือกโครงการ')
    }else{
      this.AppSV.searchReport$.next(this.searchSearch)
      this.Router.navigate(['app/report_student_total_apply_online/list'])
    }

  }
  reSet(){
    this.searchInput = {
      programs : null,
      year : '',
      sector : '',
      course_name_start : '',
      course_name_end : '',
    }
    this.searchSearch = {
      programs : null,
      year : '',
      sector : '',
      course_name_start : '',
      course_name_end : '',
    }
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
  changeacademicSemester(value){
    console.log(value)
    this.searchSearch.year = value
    // if(value == ''){
      this.AcademicSemesterService.query(`?academic_year_id=${value}`).subscribe((x: any) => {
        console.log(x)
        this.academicSemesterData = x
      })
  // }
  }
  changeIdSemester(value){
    console.log(value)
    this.searchSearch.sector = value
  }
  changeCourseStart(value){
    this.searchSearch.course_name_start = value.course_code
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
}
