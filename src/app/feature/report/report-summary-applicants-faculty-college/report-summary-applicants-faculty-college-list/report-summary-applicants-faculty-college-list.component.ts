import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'report-summary-applicants-faculty-college-list',
  templateUrl: './report-summary-applicants-faculty-college-list.component.html',
  styleUrls: ['./report-summary-applicants-faculty-college-list.component.scss']
})
export class ReportSummaryApplicantsFacultyCollegeListComponent implements OnInit {
  url : any
  searchSearch = {
    programs : '',
    year : '',
    sector : '',
    course_name_start : '',
    course_name_end : '',
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
          course_name_start : x.course_name_start,
          course_name_end : x.course_name_end,
        }
      })
    )
    .subscribe(x=>{
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_universityfaculty/view?program_id=${x.programs}&year=${x.year}&semester=${x.sector}`)
    })
    
    
  }
  back(){
    this.Router.navigate(['app/report_summary_applicants_faculty'])
  }
  search(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_universityfaculty/${this.fileDownload}?program_id=${this.searchSearch.programs}&year=${this.searchSearch.year}&semester=${this.searchSearch.sector}`)
  }
}