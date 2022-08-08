import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListEligibleApplicantsInterviewComponent } from './report-list-eligible-applicants-interview.component';

describe('ReportListEligibleApplicantsInterviewComponent', () => {
  let component: ReportListEligibleApplicantsInterviewComponent;
  let fixture: ComponentFixture<ReportListEligibleApplicantsInterviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListEligibleApplicantsInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListEligibleApplicantsInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
