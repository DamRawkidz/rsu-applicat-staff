import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSummaryAdmissionEachSchoolSearchComponent } from './report-summary-admission-each-school-search.component';

describe('ReportSummaryAdmissionEachSchoolSearchComponent', () => {
  let component: ReportSummaryAdmissionEachSchoolSearchComponent;
  let fixture: ComponentFixture<ReportSummaryAdmissionEachSchoolSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSummaryAdmissionEachSchoolSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryAdmissionEachSchoolSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
