

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { concatMap, tap } from 'rxjs/operators';
import { Permission, ApplicationPermissionService } from 'src/app/core/service/security/application-permission.service';
import { createQueryStringFromObject } from 'src/app/shared/util/fucn';



@Component({
  selector: 'app-application-permission',
  templateUrl: './application-permission.container.html',
  styleUrls: ['./application-permission.container.css']
})
export class ApplicationPermissionContainer implements OnInit {
  permission$ = new Observable<Permission[]>()
  constructor(
    private permissionSV: ApplicationPermissionService,
    // private appSV: AppService
  ) { }

  ngOnInit(): void {
    this.permission$ = this.permissionSV.getAll()
  }


  onSearch(query: any){
    let queryStr = createQueryStringFromObject(query)
    if(queryStr) return this.permission$ = this.permissionSV.query(`?${queryStr}`)
    if(!queryStr) return this.permission$ = this.permissionSV.getAll()
  }

  remove(item: Permission){
    this.permission$  = this.permissionSV.deleteData(item.app_permission_id).pipe(
      // tap(() => this.appSV.swaltAlert('ลบรายการ','ลบรายการสำเร็จแล้ว')),
      concatMap(() => this.permissionSV.getAll<Permission>())
    )
  }

  

}
