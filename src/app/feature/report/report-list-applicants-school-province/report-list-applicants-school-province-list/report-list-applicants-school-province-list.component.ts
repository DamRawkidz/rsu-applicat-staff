import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'report-list-applicants-school-province-list',
  templateUrl: './report-list-applicants-school-province-list.component.html',
  styleUrls: ['./report-list-applicants-school-province-list.component.scss']
})
export class ReportListApplicantsSchoolProvinceListComponent implements OnInit {
  url: any
  searchSearch = {
    programs: null,
    year: '',
    sector: '',
    // province_name_start: '',
    // province_name_end: '',
    // school_name_start: '',
    // school_name_end: '',
  }
  fileData = [
    {
      id: 'xls',
      name: 'Excel'
    },
    {
      id: 'mht',
      name: 'HTML'
    },
    {
      id: 'pdf',
      name: 'PDF'
    },
    {
      id: 'csv',
      name: 'CSV'
    },
  ]
  fileDownload: any
  constructor(private sanitizer: DomSanitizer,
    public AppSV: AppService,
    public Router: Router) { }
  ngOnInit(): void {
    this.AppSV.searchReport$.pipe(
      tap(x => console.log(x)),
      tap(x => {
        this.searchSearch = {
          programs: x.programs,
          year: x.year,
          sector: x.sector,
          // province_name_start: x.province_name_start,
          // province_name_end: x.province_name_end,
          // school_name_start: x.school_name_start,
          // school_name_end: x.school_name_end,
        }
      })
    )
      .subscribe(x => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_schoolprovince/view?program_id=${x.programs}&year=${x.year}&semester=${x.sector}`)
      })


  }
  back() {
    this.Router.navigate(['app/report_summary_province_school'])
  }
  search() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://rsu-app-api.71dev.com/uat/api/reports/student_schoolprovince/${this.fileDownload}?program_id=${this.searchSearch.programs}&year=${this.searchSearch.year}&semester=${this.searchSearch.sector}`)
  }
}