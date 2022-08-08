import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels);
Chart.register(...registerables);
import { throwError } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicantApplysService } from 'src/app/core/service/applicant-applys.service';
import { DashbroadService, Result } from 'src/app/core/service/dashbroad.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit,AfterViewInit {
  rows :any = []
  waitingPropertiesData = []
  waitingSubscriptionFeeData = []

  totalApply: number = 0
  payApply: number = 0
  payRegister: number = 0
  notPayRegister: number = 0
  other

  applyProgramChart:Result[] = []
  applyCourse = []

  // 
  lineChart
  applyProgrameMonth  = []
  totalProgrameMonth: number = 0
  selectProgramLineIndex: number = 0
  //  

  // 
  doughnut
  applyProgrameDoughnut = []
  totalProgrameDoughnut: number = 0
  selectProgrameDoughnut: number = 0
  // 

  tableApplyCourse:any

  //

  //
  tableApplyPrograme: any
  //
  constructor(
    public ApplicantApplysService:ApplicantApplysService,
    public appSV:AppService,
    private dashbroadSV: DashbroadService
  ) { }



  ngAfterViewInit(): void {
    this.dashbroadSV.getReportApplyProgramPercent().pipe(
      // map(res => res.result),
      tap((res: any) => {
        let data = res.filter((e:any,i,self:[]) => {
          return self.findIndex((s :any) => s.program_name == e.program_name) === i
        }).map((e:any,i,self:[]) => {
          return  {
            name: e.program_name,
            status: [...res.filter((s:any) => s.program_name == e.program_name).sort((a,b) => a.application_status_name_th.localeCompare(b.application_status_name_th))]
          }
        })
        
        this.tableApplyPrograme = [...data]
        console.log(this.tableApplyPrograme)
      })
    ).subscribe()







    this.dashbroadSV.getReportApplyCourse().pipe(
      // map(res => res.result),
      tap(res => console.log(res)),
      tap((res:any) => this.applyCourse = [...res]),
      tap(res => {
        let data = this.applyCourse.filter((e:any,i,self:[]) => {
          return self.findIndex((s :any) => s.course_name == e.course_name) === i
        }).map((e,i,self:[]) => {
          return  {
            name: e.course_name,
            status: [...res.filter((s:any) => s.course_name == e.course_name).sort((a,b) => a.application_status_name_th.localeCompare(b.application_status_name_th))]
          }
        })
        
        this.tableApplyCourse = [...data]
        console.log(this.tableApplyCourse)
      })
    ).subscribe()

    this.dashbroadSV.getReportApplyMonth().pipe(
      // map(res => res.result),
      map((result: any) => {
        let data = []
        result.map((e:any,i,self:[]) => {
          let filtered = self.filter((x:any) => x.program_name == e.program_name)
          if(!data.some(s => s.name == e.program_name)){
            data.push({
              name: e.program_name,
              data:[...filtered]
            })
          }
          
        })

        return data
      }),
      tap(result => {
        this.totalProgrameMonth = this.applyProgrameMonth.length - 1
        this.applyProgrameMonth = [...result]
        let doughnutData = this.applyProgrameMonth.map((e,i,self:[]) => {
          let _total = e.data.reduce((a,{no_of_applications}) => a + no_of_applications  ,0)
          return {
            ...e,
            total: _total,
            data: [
              ...e.data.map((d,i,self:[]) => {                
                return {
                  ...d,
                  total: _total,
                  percentage: Math.round(( d.no_of_applications / _total ) * 100)
                }
              })
            ]
          }
        })

        console.log(doughnutData)
        this.applyProgrameDoughnut = [...doughnutData]
        this.totalProgrameDoughnut = this.applyProgrameDoughnut.length - 1
      }),
      tap(() => this.initLineChart()),
      tap(() => this.initPireChart())
    ).subscribe()


    this.dashbroadSV.getReportApplyProgram().pipe(
      // map(res => res.result),
      tap((result :any) => this.applyProgramChart = [...result]),
      tap(() => this.initBarChart())
    ).subscribe()
    
  }

  ngOnInit(): void {
    this.dashbroadSV.getReportApply().pipe(
      // map(res => res.result),
      tap(res => {
        this.totalApply = res?.find(x => x.application_status_name_th == 'สำเร็จ')?.no_of_applications
        this.payApply = res?.find(x => x.application_status_name_th == 'ชำระค่าสมัคร')?.no_of_applications
        this.payRegister = res?.find(x => x.application_status_name_th == 'รอชำระค่าลงทะเบียน')?.no_of_applications
        this.notPayRegister = res?.find(x => x.application_status_name_th == 'รอชำระค่าลงทะเบียน')?.no_of_applications
        this.other = res
          .filter(x => x.application_status_name_th != 'สำเร็จ')          
          .filter(x => x.application_status_name_th != 'ชำระค่าสมัคร')          
          .filter(x => x.application_status_name_th != 'รอชำระค่าลงทะเบียน')          
          .filter(x => x.application_status_name_th != 'รอชำระค่าลงทะเบียน')          
      })
    ).subscribe()

    // this.dashbroadSV.getReportApplyMonth().subscribe()
    // this.dashbroadSV.getReportApplyProgram().subscribe()
      
    // this.initLineChart()
    // this.initPireChart()











    
  }


  initBarChart(){      
      var ctx = (document.getElementById('barChart') as any).getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: this.applyProgramChart.map((data: any) => data.program_code),
          datasets: [{
              label: 'สถิติผู้สมัครทั้งหมดแยกตามโครงการ',
              data: this.applyProgramChart.map(data => data.no_of_applications),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,      
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }
  next(){
    this.selectProgramLineIndex ++
    this.lineChart.destroy();
    this.initLineChart()
  }
  prev(){
    this.selectProgramLineIndex --
    this.lineChart.destroy();
    this.initLineChart()
  }

  initLineChart(){
    var ctx = (document.getElementById('lineChart') as any).getContext('2d');
      this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: this.applyProgrameMonth[this.selectProgramLineIndex]?.data.map(s => s.apply_month),
          datasets: [{
              // this.applyProgrameMonth[this.selectProgramLineIndex].name
              label: this.applyProgrameMonth[this.selectProgramLineIndex]?.name,
              data: this.applyProgrameMonth[this.selectProgramLineIndex]?.data.map(s => s.no_of_applications),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 1
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,        
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });

  }

  nextPieChart(){
    this.selectProgrameDoughnut ++
    this.doughnut.destroy()
    this.initPireChart()
  }

  prevPieChart(){
    this.selectProgrameDoughnut --
    this.doughnut.destroy()
    this.initPireChart()
  }

  initPireChart(){
    var ctx = (document.getElementById('donutChart') as any).getContext('2d');
    this.doughnut = new Chart(ctx, {    
    type: 'doughnut',
    data: {
        labels: this.applyProgrameDoughnut[this.selectProgrameDoughnut].data.map(e => e.apply_month),
        datasets: [{
            label: 'test',
            data: this.applyProgrameDoughnut[this.selectProgrameDoughnut].data.map(e => e.percentage),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      plugins: {
      //    datalabels: {
      //   color: '#36A2EB'
      // }
      },
      responsive: true,
      maintainAspectRatio: false,      
      scales: {
          y: {
              beginAtZero: true
          }
      }
    }
  });
  }



  
}
