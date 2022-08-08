import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportSummaryAdmissionEachSchoolListComponent } from './report-summary-admission-each-school-list.component';

describe('ReportSummaryAdmissionEachSchoolListComponent', () => {
  let component: ReportSummaryAdmissionEachSchoolListComponent;
  let fixture: ComponentFixture<ReportSummaryAdmissionEachSchoolListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSummaryAdmissionEachSchoolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSummaryAdmissionEachSchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
