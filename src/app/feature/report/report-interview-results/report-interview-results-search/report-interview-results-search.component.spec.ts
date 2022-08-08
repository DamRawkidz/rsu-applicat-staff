import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportInterviewResultsSearchComponent } from './report-interview-results-search.component';

describe('ReportInterviewResultsSearchComponent', () => {
  let component: ReportInterviewResultsSearchComponent;
  let fixture: ComponentFixture<ReportInterviewResultsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInterviewResultsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInterviewResultsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
