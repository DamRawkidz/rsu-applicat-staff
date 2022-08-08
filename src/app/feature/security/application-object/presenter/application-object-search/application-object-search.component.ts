import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-application-object-search',
  templateUrl: './application-object-search.component.html',
  styleUrls: ['./application-object-search.component.css']
})
export class ApplicationObjectSearchComponent implements OnInit {
  request = {
    app_object_code: null,
    app_object_name_th: null,
    app_object_name_en: null
  }

  @Output() onSearch = new EventEmitter<any>()
  constructor(
    public location: Location
  ) { }

  ngOnInit(): void {
  }



  search(){
    this.onSearch.emit(this.request)
  }

  reset(){
    this.request.app_object_code = null
    this.request.app_object_name_th = null
    this.request.app_object_name_en = null
    this.search()
  }

}
