
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseList } from 'src/app/core/base/base-list';
import { Router } from '@angular/router';




@Component({
  selector: 'app-application-object-list',
  templateUrl: './application-object-list.component.html',
  styleUrls: ['./application-object-list.component.css']
})
export class ApplicationObjectListComponent extends BaseList implements OnInit,OnChanges {
  @Input() rows: any[] = []
  @Output() onDelete = new EventEmitter<any>()

  constructor(
    private router: Router
  ) {
    super()
   }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.rows) return this.rows =  this.updateMatTable(this.rows)
  }

  add(){
    this.router.navigate(['/app/application-object/add'])
  }

  ngOnInit(): void {
  }

  onRemove(object) {
    this.onDelete.emit(object)
  }

}
