import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseList } from 'src/app/core/base/base-list';

@Component({
  selector: 'program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent extends BaseList implements OnInit,OnChanges {
  @Input() tableApplyPrograme

  constructor() {
    super()
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.tableApplyPrograme = new MatTableDataSource(this.tableApplyPrograme)
    this.tableApplyPrograme.sort = this.sort
    this.tableApplyPrograme.paginator = this.paginator
  }

  ngOnInit(): void {
  }

}
