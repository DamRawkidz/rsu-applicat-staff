import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSummaryApplicantsFacultyCollegeSearchComponent } from './report-summary-applicants-faculty-college-search.component';

describe('ReportSummaryApplicantsFacultyCollegeSearchComponent', () => {
  let component: ReportSummaryApplicantsFacultyCollegeSearchComponent;
  let fixture: ComponentFixture<ReportSummaryApplicantsFacultyCollegeSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSummaryApplicantsFacultyCollegeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryApplicantsFacultyCollegeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
