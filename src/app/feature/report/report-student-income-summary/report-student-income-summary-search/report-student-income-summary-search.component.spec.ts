import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportStudentIncomeSummarySearchComponent } from './report-student-income-summary-search.component';

describe('ReportStudentIncomeSummarySearchComponent', () => {
  let component: ReportStudentIncomeSummarySearchComponent;
  let fixture: ComponentFixture<ReportStudentIncomeSummarySearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentIncomeSummarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentIncomeSummarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
