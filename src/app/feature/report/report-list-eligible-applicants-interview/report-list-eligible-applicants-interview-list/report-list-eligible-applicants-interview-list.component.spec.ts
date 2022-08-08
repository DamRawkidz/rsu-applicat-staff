import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListEligibleApplicantsInterviewListComponent } from './report-list-eligible-applicants-interview-list.component';

describe('ReportListEligibleApplicantsInterviewListComponent', () => {
  let component: ReportListEligibleApplicantsInterviewListComponent;
  let fixture: ComponentFixture<ReportListEligibleApplicantsInterviewListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListEligibleApplicantsInterviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListEligibleApplicantsInterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
