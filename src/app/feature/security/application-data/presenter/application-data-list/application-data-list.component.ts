import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-data-list',
  templateUrl: './application-data-list.component.html',
  styleUrls: ['./application-data-list.component.css']
})
export class ApplicationDataListComponent implements OnInit {
  rows
  constructor(
    public rouer: Router
  ) { }

  ngOnInit(): void {
    
  }

  add(){
    this.rouer.navigate(['/menu/data/add'])
  }

}
