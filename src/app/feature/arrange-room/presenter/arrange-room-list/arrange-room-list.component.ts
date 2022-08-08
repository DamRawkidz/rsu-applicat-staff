import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AcademicSemesterService } from 'src/app/core/service/academic-semester.service';
import { AcademicYearService } from 'src/app/core/service/academic-year.service';
import { BuildingService } from 'src/app/core/service/building.service';
import { CourseService } from 'src/app/core/service/course.service';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { PopupExamSettingComponent } from '../popup-exam-setting/popup-exam-setting.component';

@Component({
  selector: 'arrange-room-list',
  templateUrl: './arrange-room-list.component.html',
  styleUrls: ['./arrange-room-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrangeRoomListComponent implements OnInit {
  num : number = 0
  num2 : number = 0
  order : number = 0
  rows:any = [
    {year:'25xx',term:'25xx',code:'0001',name:'ตัวอย่าง',status:'ตัวอย่าง',action:''}
  ]
  academicYearData = []
  academicSemesterData = []
  courseData = []
  programsData = []
  roomsData = []
  buildingData = []
  program_code:any
  course_code:any
  searchInput = {
    program_code : '',
    course_code : '',
    first_name_th : '',
    last_name_th : '',
    personal_id : null
  }
  constructor(public router:Router,
              public AcademicYearService:AcademicYearService,
              public CourseService:CourseService,
              public ProgramsService:ProgramsService,
              public BuildingService:BuildingService,
              public dialog:MatDialog,
              public AcademicSemesterService:AcademicSemesterService) {
                this.AcademicYearService.getAll().subscribe((x: any) => {
                  console.log(x)
                  this.academicYearData = x
                })
                this.ProgramsService.getAll().subscribe((x: any) => {
                  this.programsData = x
                  this.programsData = x.map(x => {
                    return { ...x, isCheck: false, display: x.program_code + '-' + x.program_name_th }
                  })
                  console.log(this.programsData)
                })
                this.BuildingService.getAll().subscribe((x: any) => {
                  console.log(x)
                  this.buildingData = x
                })
               }

  ngOnInit(): void {
  }
  changeYear(id){
    console.log(id)
    this.AcademicSemesterService.query(`?academic_year_id=${id}`).subscribe((x: any) => {
      console.log(x)
      this.academicSemesterData = x
    })
  }
  inputProgram(value){
    if(value == ''){
      this.CourseService.getAll().subscribe((x: any) => {
        this.courseData = x
        this.courseData = x.map(x => {
          return { ...x, isCheck: false, display: x.major_code + '-' + x.course_name_th }
        })
        console.log(this.courseData);
        
      })
    }
  }
  changeProgram(value){
    console.log(value)
    this.ProgramsService.query(`${value.program_id}`).subscribe((x: any) => {
      this.courseData = x.programCourses.map(x => {
        return { ...x, isCheck: false, display: x.major_code+'-'+x.course_name_th  }
      })
      console.log(this.courseData)
    })
    // this.searchInput.course_code = ''
  }
  aa(a){
    console.log(a.value)
    this.num = a.value
    this.num2 = 0
    console.log(this.num2)
  }
  b(b){
    this.order = b.value
  }
  gotoProcessPage(){
    this.router.navigate(['app/arrange-room/process'])
  }
  getRooms(floorCode) {
    console.log(floorCode)
    let a = encodeURIComponent(floorCode)
    console.log(a)
    this.BuildingService.getRooms(a).subscribe((x: any) => {
      console.log(x)
      this.roomsData = x
    })
  }
  openPopUpEditExam() {
    const dialogRef = this.dialog.open(
      PopupExamSettingComponent, {
      width: '70%',
      // height: '100%',
      data: {}  // ใส่ข้อมูลที่จะส่งไปหน้า dialog นะ          
    }
    )

    dialogRef.afterClosed().subscribe(callback => {
      console.log(callback)
    })

  }
}
