
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ApplicationData, ApplicationObjectService } from 'src/app/core/service/security/application-object.service';
import { createQueryStringFromObject } from 'src/app/shared/util/fucn';




@Component({
  selector: 'app-application-object',
  templateUrl: './application-object.container.html',
  styleUrls: ['./application-object.container.css']
})
export class ApplicationObjectContainer implements OnInit {
  applicationData$ = new Observable<ApplicationData[]>()
  constructor(
    private objectSV: ApplicationObjectService,
    // private appSV: AppService
  ) { }

  ngOnInit(): void {
    this.applicationData$ = this.objectSV.getAll()
  }



  onSearch(query: any){
    let queryStr = createQueryStringFromObject(query)
    if(queryStr) return this.applicationData$ = this.objectSV.query(`?${queryStr}`)
    if(!queryStr) return this.applicationData$ = this.objectSV.getAll()
  }


  onDelete(object) {
    this.applicationData$ = this.objectSV.deleteData(object.app_object_id).pipe(
      concatMap(() => this.objectSV.getAll<ApplicationData>()),
      // tap(() => this.appSV.swaltAlert())
    )
  }


}
