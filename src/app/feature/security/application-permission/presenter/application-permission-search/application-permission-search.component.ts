import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-application-permission-search',
  templateUrl: './application-permission-search.component.html',
  styleUrls: ['./application-permission-search.component.css']
})
export class ApplicationPermissionSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<any>()
  
  request = {
    app_permission_code: null,
    app_permission_name_en: null,
    app_permission_name_th: null
  }
  constructor() { }

  ngOnInit(): void {
  }


  search(){
    this.onSearch.emit(this.request)
  }

  reset(){
    this.request.app_permission_code = null
    this.request.app_permission_name_en = null
    this.request.app_permission_name_th = null
    this.onSearch.emit(this.request)
  }
}
