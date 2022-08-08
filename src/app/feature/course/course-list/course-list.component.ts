import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/core/service/programs.service';
import { CourseService } from 'src/app/core/service/course.service';
import { StatusService } from 'src/app/core/service/status.service';
import { DocumentTypesService } from 'src/app/core/service/document-types.service';
import { MajorService } from 'src/app/core/service/major.service';
import { FacultyService } from 'src/app/core/service/faculty.service';
import { BaseList } from 'src/app/core/base/base-list';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent extends BaseList implements OnInit {
  rows:any = []
  documentTypesData = []
  programsData = []
  statusData = []
  facultyData = []
  majorData = []
  searchInput = {
    
    search : '',
  }
  constructor(public router:Router,
              public ProgramsService:ProgramsService,
              public CourseService:CourseService,
              public StatusService:StatusService,
              public MajorService:MajorService,
              public FacultyService:FacultyService,
              public DocumentTypesService:DocumentTypesService,
                      ) { super()
                        this.FacultyService.getAll().subscribe((x:any)=>{
                          console.log(x)
                          this.facultyData = x
                        })
                        this.MajorService.getAll().subscribe((x:any)=>{
                          console.log(x)
                          this.majorData = x
                        })
                        this.ProgramsService.getAll().subscribe((x:any)=>{
                          console.log(x)
                          this.programsData = x
                        })
                        this.DocumentTypesService.getAll().subscribe((x:any)=>{
                          console.log(x)
                          this.documentTypesData = x
                        })
                        this.StatusService.getAll().subscribe((x:any)=>{
                          this.statusData = x
                          console.log(this.statusData)
                        })
                       }

  ngOnInit(): void {
    this.CourseService.getAll().subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  recall(input) {
    if (input == '') {
      this.ngOnInit()
      // this.isDisableButtonDelete = false  // search disabled
    }
  }
  search(){
    console.log(this.searchInput)
    this.CourseService.search(this.searchInput.search).subscribe((x:any)=>{
      console.log(x)
      this.rows = x
      this.rows = new MatTableDataSource(this.rows);
      this.rows.sort = this.sort
      this.rows.paginator = this.paginator;
    })
  }
  gotoAddcoursePage(){
    this.router.navigate(['app/course/add'])
  }
  gotoEditcoursePage(id){
    this.router.navigate(['app/course/edit',id])
  }
}
