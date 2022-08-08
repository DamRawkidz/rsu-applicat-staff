import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { AppService } from 'src/app/core/service/app.service';
import { Role, ApplicationRoleService } from 'src/app/core/service/security/application-role.service';
import { createQueryStringFromObject } from 'src/app/shared/util/fucn';


@Component({
  selector: 'app-application-role',
  templateUrl: './application-role.container.html',
  styleUrls: ['./application-role.container.css']
})
export class ApplicationRoleContainer implements OnInit {
  roles$ = new Observable<Role[]>()
  constructor(
    private roleSV: ApplicationRoleService,
    private appSV: AppService
  ) { }

  ngOnInit(): void {
    this.roles$ = this.roleSV.getAll()
  }


  onSearch(query: any){
    let queryStr = createQueryStringFromObject(query)
    if(queryStr) return this.roles$ = this.roleSV.query(`?${queryStr}`)
    if(!queryStr) return this.roles$ = this.roleSV.getAll()
  }

  remove(item: Role){
    this.roles$  = this.roleSV.deleteData(item.app_role_id).pipe(
      tap(() => this.appSV.swaltAlert('ลบรายการ','ลบรายการสำเร็จแล้ว')),
      concatMap(() => this.roleSV.getAll<Role>())
    )
  }
}
