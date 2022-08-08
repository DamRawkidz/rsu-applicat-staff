import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportStudentAdmissionsListComponent } from './report-student-admissions-list.component';

describe('ReportStudentAdmissionsListComponent', () => {
  let component: ReportStudentAdmissionsListComponent;
  let fixture: ComponentFixture<ReportStudentAdmissionsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStudentAdmissionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentAdmissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
