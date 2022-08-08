import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { ApplicationUser, ApplicationUserService } from 'src/app/core/service/security/application-user.service';

@Component({
  selector: 'app-application-user',
  templateUrl: './application-user.component.html',
  styleUrls: ['./application-user.component.css']
})
export class ApplicationUserComponent implements OnInit {
  user$ = new Observable<ApplicationUser[]>()
  
  constructor(
    private userSV: ApplicationUserService,
    private appSV: AppService
  ) { 
    this.user$ = this.userSV.getAll()
  }

  ngOnInit(): void {

    
  }

  search(query: string){
    if(query) return this.user$ = this.userSV.query(`?${query}`)
    if(!query) return this.user$ = this.userSV.getAll()
  }

  remove(user: ApplicationUser){
    this.user$ = this.userSV.deleteData(user.app_user_id).pipe(
      concatMap(() => this.userSV.getAll<ApplicationUser>()),
      tap(() => this.appSV.swaltAlert('ลบรายการ','ลบรายการสำเร็จแล้ว'))
    )
  }

}
