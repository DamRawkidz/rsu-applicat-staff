import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportStudentAdmissionsSearchComponent } from './report-student-admissions-search.component';

describe('ReportStudentAdmissionsSearchComponent', () => {
  let component: ReportStudentAdmissionsSearchComponent;
  let fixture: ComponentFixture<ReportStudentAdmissionsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentAdmissionsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentAdmissionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
