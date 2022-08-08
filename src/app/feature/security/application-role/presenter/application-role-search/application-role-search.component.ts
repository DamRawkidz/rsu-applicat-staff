import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-application-role-search',
  templateUrl: './application-role-search.component.html',
  styleUrls: ['./application-role-search.component.css']
})
export class ApplicationRoleSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<any>()
  
  request = {
    app_role_code: null,
    app_role_name_en: null,
    app_role_name_th: null
  }
  constructor() { }

  ngOnInit(): void {
  }


  search(){
    this.onSearch.emit(this.request)
  }

  reset(){
    this.request.app_role_code = null
    this.request.app_role_name_en = null
    this.request.app_role_name_th = null
    this.onSearch.emit(this.request)
  }
}
