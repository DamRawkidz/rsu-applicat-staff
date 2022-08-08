import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { publish, tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';


@Component({
  selector: 'student-total-apply-online-list',
  templateUrl: './student-total-apply-online-list.component.html',
  styleUrls: ['./student-total-apply-online-list.component.scss']
})
export class StudentTotalApplyOnlineListComponent implements OnInit {
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
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/view?program_id=${x.programs}`)
    })
    
    
  }
  back(){
    this.Router.navigate(['app/report_student_total_apply_online'])
  }
  search(){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_totalapply/${this.fileDownload}?program_id=${this.searchSearch.programs}`)
  }

}
