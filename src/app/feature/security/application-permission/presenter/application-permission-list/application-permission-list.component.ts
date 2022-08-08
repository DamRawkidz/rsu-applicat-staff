import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/core/service/security/application-permission.service';



@Component({
  selector: 'app-application-permission-list',
  templateUrl: './application-permission-list.component.html',
  styleUrls: ['./application-permission-list.component.css']
})
export class ApplicationPermissionListComponent implements OnInit {
  @Input() rows: Permission[] = []
  @Output() onDelete = new EventEmitter<any>()

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/app/application-permission/add'])
  }


  remove(permission: Permission){
    this.onDelete.emit(permission)
  }

}
