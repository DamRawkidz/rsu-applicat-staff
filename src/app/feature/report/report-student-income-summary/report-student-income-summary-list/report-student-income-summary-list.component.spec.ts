import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportStudentIncomeSummaryListComponent } from './report-student-income-summary-list.component';

describe('ReportStudentIncomeSummaryListComponent', () => {
  let component: ReportStudentIncomeSummaryListComponent;
  let fixture: ComponentFixture<ReportStudentIncomeSummaryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentIncomeSummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentIncomeSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
