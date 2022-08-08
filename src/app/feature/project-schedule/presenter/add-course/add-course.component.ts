import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseService } from 'src/app/core/service/course.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupExaminationfeeComponent } from '../popup-examinationfee/popup-examinationfee.component';
import { PopupExamComponent } from '../popup-exam/popup-exam.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { MajorService } from 'src/app/core/service/major.service';
import { ExamSubjectsService } from 'src/app/core/service/exam-subjects.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppService } from 'src/app/core/service/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { BaseList } from 'src/app/core/base/base-list';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseComponent extends BaseList implements OnInit {
  rows: any = []
  courseData: any = []
  searchInput:any
  formCourseAdd = []
  formCourseDel = []
  formC = {
    program_course_id: null,
    program_id: null,
    course_code: '',
    validate_flag: false,
    written_flag: false,
    interview_flag: false,
    practice_flag: false,
    written_price: 0,
    interview_price: 0,
    practical_price: 0,
    document_flag: true,
    schedule_flag: true,
    is_flag: false,
    status_id: null,
    create_by: null,
    create_date: null,
    last_update_by: null,
    last_update_date: null,
    courseDocuments: [],
    courseSchedules: []
  }
  constructor(
    public dialogRef: MatDialogRef<PopupExamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public FormBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public CourseService: CourseService,
    public appSV: AppService,
    public ExamSubjectsService: ExamSubjectsService,
    public dialog: MatDialog,
  ) {
    super()
    // this.CourseService.getAll().subscribe((x: any) => {
    //   console.log(x)
    //   this.courseData = x
    // })
  }

  ngOnInit(): void {
    console.log(this.data)
    this.CourseService.getAll().subscribe((x: any) => {
      console.log(x)
      this.courseData = x
      this.courseData = x.map(x => {
        return { ...x, isCheck: false ,display:x.faculty_curriculum_code+'-'+x.course_name_th}
      })
     
        this.data.value.programCourses.forEach(element => {
          this.formCourseAdd.push(element)
        });
      
     
      // this.courseData = new MatTableDataSource(this.courseData);
      // this.courseData.sort = this.sort
      // this.courseData.paginator = this.paginator;
      console.log(this.formCourseAdd)
      console.log(this.courseData)
    })
  
  }
  addCourse(value, data) {
    console.log(data)
    if (value) {
      // this.formC.course_code = data.course_code
      this.formCourseAdd.push(
        {
          program_course_id: null,
          program_id: null,
          course_code: data.course_code,
          validate_flag: false,
          written_flag: false,
          interview_flag: false,
          practice_flag: false,
          written_price: 0,
          interview_price: 0,
          practical_price: 0,
          document_flag: true,
          schedule_flag: true,
          is_flag: false,
          status_id: 0,
          create_by: null,
          create_date: null,
          last_update_by: null,
          last_update_date: null,
          courseDocuments: [],
          courseSchedules: []
        }
      )
      console.log(this.formCourseAdd)
    } else {
      let i = this.formCourseAdd.findIndex(x => x.course_code == data.course_code)
      console.log(i);
      if (i != -1) {
        this.formCourseAdd.splice(i, 1)
      }else{
        this.formCourseDel.push(
          {
            program_course_id: null,
            program_id: null,
            course_code: data.course_code,
            validate_flag: false,
            written_flag: false,
            interview_flag: false,
            practice_flag: false,
            written_price: 0,
            interview_price: 0,
            practical_price: 0,
            document_flag: true,
            schedule_flag: true,
            is_flag: false,
            status_id: 0,
            create_by: null,
            create_date: null,
            last_update_by: null,
            last_update_date: null,
            courseDocuments: [],
            courseSchedules: []
          }
        )
      }
      console.log(this.formCourseAdd)
      console.log(this.formCourseDel)
    }
  }
  addCourseAll(value) {
    if (value) {
      this.courseData.forEach(element => {
        let i = this.formCourseAdd.findIndex(x => x.course_code == element.course_code)
        // console.log(i);
        if(i == -1){
          this.formCourseAdd.push({
            program_course_id: null,
            program_id: null,
            course_code: element.course_code,
            validate_flag: false,
            written_flag: false,
            interview_flag: false,
            practice_flag: false,
            written_price: 0,
            interview_price: 0,
            practical_price: 0,
            document_flag: true,
            schedule_flag: true,
            is_flag: false,
            status_id: 0,
            create_by: null,
            create_date: null,
            last_update_by: null,
            last_update_date: null,
            courseDocuments: [],
            courseSchedules: []
          })
        }

        
      });
      console.log(this.formCourseAdd)
    } else {
      this.courseData.forEach(element => {
        element.isCheck = false
      });
      this.formCourseAdd = []
      console.log(this.formCourseAdd)
    }
  }
  recall(input) {
    if (input == '') {
      
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  save() {
    this.dialogRef.close({add:this.formCourseAdd,del:this.formCourseDel})

  }
  search(value){
    setTimeout(() => {
      this.searchInput = value      
    }, 800);

  }
  clear(){
    this.searchInput = ''
  }
  close() {
    this.dialogRef.close([])
  }
}
