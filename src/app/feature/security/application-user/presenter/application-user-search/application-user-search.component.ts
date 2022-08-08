import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createQueryStringFromObject } from 'src/app/shared/util/fucn';


@Component({
  selector: 'app-application-user-search',
  templateUrl: './application-user-search.component.html',
  styleUrls: ['./application-user-search.component.css']
})
export class ApplicationUserSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<any>()
  request = {
    login_name: null,
    display_name: null
  }
  constructor() {   }

  ngOnInit(): void {
  }

  search(){
    const query = createQueryStringFromObject(this.request)
    this.onSearch.emit(query)
  }

  reset(){
    this.request.login_name = null
    this.request.display_name = null
    this.search()
  }

}
