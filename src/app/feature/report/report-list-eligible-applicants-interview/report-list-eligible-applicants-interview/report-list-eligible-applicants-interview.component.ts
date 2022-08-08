import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'report-list-eligible-applicants-interview',
  templateUrl: './report-list-eligible-applicants-interview.component.html',
  styleUrls: ['./report-list-eligible-applicants-interview.component.scss']
})
export class ReportListEligibleApplicantsInterviewComponent implements OnInit {
  url : any
  aa = 'https://stackoverflow.com/questions/52639526/using-onerror-on-an-iframe'
  searchSearch = {
    programs : '',
    year : '',
    sector : '',
    course_code : '',
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
    public http:HttpClient,
    public Router : Router) { }
  ngOnInit(): void {
    this.AppSV.searchReport$.pipe(
      tap(x=>console.log(x)),
      tap(x=>{
        this.searchSearch = {
          programs : x.programs,
          year : x.year,
          sector : x.sector,
          course_code : x.course_code,
        }
      })
    )
    .subscribe(x=>{
      // try {
      
      //   this.http.get(`https://rsu-app-api.71dev.com/uat/api/reports/eligible_for_interview/view?program_id=${x.programs}&academic_year_id=${x.year}&academic_semester_id=${x.sector}&course_code=${x.course_code}`)
      // } catch (error) {
      //   console.error(error);
        
      // }
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/eligible_for_interview/view?program_id=${x.programs}&academic_year_id=${x.year}&academic_semester_id=${x.sector}&course_code=${x.course_code}`);
      
      console.log(this.url)
    })
    
    
  }
  
  back(){
    this.Router.navigate(['app/report_eligible_interview'])
  }
  error_iframe(){
    this.AppSV.swaltAlertError('','ไม่')
  }
  search(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/eligible_for_interview/${this.fileDownload}?program_id=${this.searchSearch.programs}&academic_year_id=${this.searchSearch.year}&academic_semester_id=${this.searchSearch.sector}&course_code=${this.searchSearch.course_code}`)
  }
}


