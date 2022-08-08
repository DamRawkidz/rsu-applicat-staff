import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSeparatedCourseSearchComponent } from './report-separated-course-search.component';

describe('ReportSeparatedCourseSearchComponent', () => {
  let component: ReportSeparatedCourseSearchComponent;
  let fixture: ComponentFixture<ReportSeparatedCourseSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSeparatedCourseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSeparatedCourseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
