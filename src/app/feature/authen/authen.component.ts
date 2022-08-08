import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';
import { LogInService } from 'src/app/core/service/log-in.service';
import { AppService } from 'src/app/core/service/app.service';
import { OdicOpenService } from 'src/app/core/service/odic/odic-open.service';

@Component({
  selector: 'authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenComponent implements OnInit {
  user : any 
  password : any
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public odic: OdicOpenService,
    public AppService: AppService
  ) { }

  ngOnInit(): void {
    this.odic.manager.signinRedirectCallback().then(res => {
      console.log(res);
      
      this.odic.user = res
      this.router.navigate(['/app/dashboard'])
    }).catch(err => {
    })
  }


  authen(){
    if(this.user == 'admin' && this.password == '1234'){
      this.router.navigate(['/app'])
    }else{
      this.AppService.swaltAlertError('Error','รหัสผิดพลาด')
    }
    
  }

}
