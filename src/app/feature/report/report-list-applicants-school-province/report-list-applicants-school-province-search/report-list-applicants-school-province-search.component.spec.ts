import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListApplicantsSchoolProvinceSearchComponent } from './report-list-applicants-school-province-search.component';

describe('ReportListApplicantsSchoolProvinceSearchComponent', () => {
  let component: ReportListApplicantsSchoolProvinceSearchComponent;
  let fixture: ComponentFixture<ReportListApplicantsSchoolProvinceSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListApplicantsSchoolProvinceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListApplicantsSchoolProvinceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
