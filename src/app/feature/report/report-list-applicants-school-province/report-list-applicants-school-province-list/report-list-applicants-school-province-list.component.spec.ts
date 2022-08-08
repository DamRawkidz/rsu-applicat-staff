import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListApplicantsSchoolProvinceListComponent } from './report-list-applicants-school-province-list.component';

describe('ReportListApplicantsSchoolProvinceListComponent', () => {
  let component: ReportListApplicantsSchoolProvinceListComponent;
  let fixture: ComponentFixture<ReportListApplicantsSchoolProvinceListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListApplicantsSchoolProvinceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListApplicantsSchoolProvinceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
