import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSummaryApplicantsFacultyCollegeListComponent } from './report-summary-applicants-faculty-college-list.component';

describe('ReportSummaryApplicantsFacultyCollegeListComponent', () => {
  let component: ReportSummaryApplicantsFacultyCollegeListComponent;
  let fixture: ComponentFixture<ReportSummaryApplicantsFacultyCollegeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSummaryApplicantsFacultyCollegeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryApplicantsFacultyCollegeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
