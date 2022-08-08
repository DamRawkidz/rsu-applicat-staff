import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/core/service/app.service';
import { OdicOpenService } from 'src/app/core/service/odic/odic-open.service';
import { AppTokenService } from 'src/app/core/service/security/app-token.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent implements OnInit {
  user : any 
  password : any
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public odic: OdicOpenService,
    public AppService: AppService,
    public apptokenSV: AppTokenService
  ) { }

  ngOnInit(): void {
    // this.odic.manager.signinRedirectCallback().then(res => {
    //   console.log(res);
      
    //   this.odic.user = res
    //   this.apptokenSV.exchangeToken().subscribe((x)=>{
    //     console.log(x)
    //     this.router.navigate(['/app/dashboard'])
    // })
    // }).catch(err => {
    // })

   
    this.odic.manager.signinRedirectCallback().then(res => {
      console.log(res);
      this.odic.user = res
      this.apptokenSV.exchangeToken().subscribe((x)=>{
        console.log(x)
        this.router.navigate(['app/dashboard'])
    })
    }).catch(err => {
    })



  }


 
  // openPopUp(){
  //   const dialogRef = this.dialog.open(DialogDemoComponent, {
  //     width: '250px',
  //     data: {data:'demoDialog'}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      
  //   });
  // }

}
