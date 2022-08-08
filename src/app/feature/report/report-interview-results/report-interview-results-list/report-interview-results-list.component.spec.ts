import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportInterviewResultsListComponent } from './report-interview-results-list.component';

describe('ReportInterviewResultsListComponent', () => {
  let component: ReportInterviewResultsListComponent;
  let fixture: ComponentFixture<ReportInterviewResultsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInterviewResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInterviewResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
