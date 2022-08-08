import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { AppService } from 'src/app/core/service/app.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { ProgramsService } from 'src/app/core/service/programs.service';

@Component({
  selector: 'report-separated-course-search',
  templateUrl: './report-separated-course-search.component.html',
  styleUrls: ['./report-separated-course-search.component.scss']
})
export class ReportSeparatedCourseSearchComponent implements OnInit {
  searchInput = {
    programs : '',
    year : '',
    sector : '',
    exam_name_start : '',
    exam_name_end : '',
  }
  searchSearch = {
    programs : '',
    year : '',
    sector : '',
    exam_name_start : '',
    exam_name_end : '',
  }
  programsData = []
  courseData = []
  academicSemesterData = []
  academicYearData = []
  examSubjectsData = []
  constructor(
    public ProgramsService :ProgramsService,
    public AcademicYearService :AcademicYearService,
    public ExamSubjectsService :ExamSubjectsService,
    public router :Router,
    public AppSV :AppService,
    public CourseService :CourseService,
    public AcademicSemesterService :AcademicSemesterService,
  ) {
    this.ProgramsService.getAll().subscribe((x: any) => {
      this.programsData = x
      this.programsData = x.map(x => {
        return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
      })
      console.log(this.programsData)
    })
    this.ExamSubjectsService.getAll().subscribe((x: any) => {
      this.examSubjectsData = x
      this.examSubjectsData = x.map(x => {
        return { ...x, isCheck: false, display: x.exam_subject_code + '-' + x.exam_subject_name_th }
      })
      console.log(this.examSubjectsData)
    })
    this.AcademicYearService.getAll().subscribe((x: any) => {
      this.academicYearData = x
      console.log(this.academicYearData)
    })
   
   }

  ngOnInit(): void {
  }

  search(){
    this.AppSV.searchReport$.next(this.searchSearch)
    this.router.navigate(['app/report_separated_course/list'])
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
    // if(value == ''){
      this.searchSearch.year = value
      this.AcademicSemesterService.query(`?academic_year_id=${value}`).subscribe((x: any) => {
        console.log(x)
        this.academicSemesterData = x
      })
  // }
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
  startExam(value){
    this.searchSearch.exam_name_start = value
  }
  endExam(value){
    this.searchSearch.exam_name_end = value
  }
}
