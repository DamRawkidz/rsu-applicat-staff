import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'report-separated-course-list',
  templateUrl: './report-separated-course-list.component.html',
  styleUrls: ['./report-separated-course-list.component.scss']
})
export class ReportSeparatedCourseListComponent implements OnInit {
  url : any
  searchSearch = {
    programs : '',
    year : '',
    sector : '',
    exam_name_start : '',
    exam_name_end : '',
  }
  fileData = [
    {
    id : 'xls',
    name : 'Excel'
  },
    {
    id : 'mht',
    name : 'HTML'
  },
    {
    id : 'pdf',
    name : 'PDF'
  },
    {
    id : 'csv',
    name : 'CSV'
  },
]
  fileDownload : any
  constructor(private sanitizer: DomSanitizer,
    public AppSV:AppService,
    public Router : Router) { }
  ngOnInit(): void {
    this.AppSV.searchReport$.pipe(
      tap(x=>console.log(x)),
      tap(x=>{
        this.searchSearch = {
          programs : x.programs,
          year : x.year,
          sector : x.sector,
          exam_name_start : x.exam_name_start,
          exam_name_end : x.exam_name_end,
        }
      })
    )
    .subscribe(x=>{
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_apply_department/view?program_id=${x.programs}&year=${x.year}&semester=${x.sector}&exam_name_start=${x.exam_name_start}&exam_name_end=${x.exam_name_end}`)
    })
    
    
  }
  back(){
    this.Router.navigate(['app/report_separated_course'])
  }
  search(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_apply_department/${this.fileDownload}?program_id=${this.searchSearch.programs}&year=${this.searchSearch.year}&semester=${this.searchSearch.sector}&exam_name_start=${this.searchSearch.exam_name_start}&exam_name_end=${this.searchSearch.exam_name_end}`)
  }
}
