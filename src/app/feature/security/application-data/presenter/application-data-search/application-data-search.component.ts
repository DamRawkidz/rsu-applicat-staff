import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-application-data-search',
  templateUrl: './application-data-search.component.html',
  styleUrls: ['./application-data-search.component.css']
})
export class ApplicationDataSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<any>()
  request = {
    code: null,
    name: null
  }
  constructor() { }
  
  ngOnInit(): void {
  }

  search(){}

  reset(){

  }

}
