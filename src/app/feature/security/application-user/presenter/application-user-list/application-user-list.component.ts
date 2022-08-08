import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from 'src/app/core/base/base-list';

@Component({
  selector: 'app-application-user-list',
  templateUrl: './application-user-list.component.html',
  styleUrls: ['./application-user-list.component.css']
})
export class ApplicationUserListComponent extends BaseList implements OnInit,OnChanges {
  @Input() rows = []
  @Output() onDelete = new EventEmitter<void>()
  constructor(
      private router: Router
  ) {
    super()
   }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.rows) return this.rows = this.updateMatTable(this.rows)
  }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/app/application-user/add'])
  }
  edit(id){
    this.router.navigate(['/app/application-user/edit',id])
  }

  remove(user){
    this.onDelete.emit(user)
  }




}
