import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSeparatedCourseListComponent } from './report-separated-course-list.component';

describe('ReportSeparatedCourseListComponent', () => {
  let component: ReportSeparatedCourseListComponent;
  let fixture: ComponentFixture<ReportSeparatedCourseListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSeparatedCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSeparatedCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
