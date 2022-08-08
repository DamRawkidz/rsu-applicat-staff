import { Component } from '@angular/core';
import { SchoolService } from './core/service/school.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-folder-structure';
  constructor(
    private schoolSV:SchoolService,
    // private router:Router
  ){
    // this.schoolSV.query(``).pipe(
    //   tap(x=>{ this.schoolSV.schoolChange$.next(x) })
    //   ).subscribe((x:any)=>{console.log(x)})





  }
  
}
