import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/core/service/security/application-permission.service';


@Component({
  selector: 'app-application-role-list',
  templateUrl: './application-role-list.component.html',
  styleUrls: ['./application-role-list.component.css']
})
export class ApplicationRoleListComponent implements OnInit {
  @Input() rows: Permission[] = []
  @Output() onDelete = new EventEmitter<any>()
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  remove(permission: Permission){
    this.onDelete.emit(permission)
  }


  add(){
      this.router.navigate(['/app/application-role/add'])
  }

}
