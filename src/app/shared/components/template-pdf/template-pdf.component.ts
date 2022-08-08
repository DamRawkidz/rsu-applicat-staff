import { DatePipe } from '@angular/common';
import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'template-pdf',
  templateUrl: './template-pdf.component.html',
  styleUrls: ['./template-pdf.component.scss']
})
export class TemplatePdfComponent implements OnInit,OnDestroy{
  prefix:string = ''
  nameHotel:string = ''
  userName:string = ''
  currentDate:string = ''
  private subscription = new Subscription()
  @Input() NeedSpace:boolean = false
  constructor(
    private appservice:AppService,
    private datePipe: DatePipe,
    private ngzone: NgZone
  ) { }

  ngOnInit() {
    
    this.ngzone.runOutsideAngular(() => {
      this.subscription = interval(1000).subscribe(x => {
        this.currentDate = this.datePipe.transform(new Date(),'dd-MMM-y/HH:mm:ss')
      })
    })
     


  }  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
