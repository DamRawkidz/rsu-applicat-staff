import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseList } from 'src/app/core/base/base-list';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent extends BaseList implements OnInit,OnChanges {
  @Input() tableApplyCourse
  constructor() {
    super()
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableApplyCourse = new MatTableDataSource(this.tableApplyCourse)
    this.tableApplyCourse.sort = this.sort
    this.tableApplyCourse.paginator = this.paginator
  }

  ngOnInit(): void {
  }

}
