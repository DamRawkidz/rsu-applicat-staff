import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListApplicantsAddressSearchComponent } from './report-list-applicants-address-search.component';

describe('ReportListApplicantsAddressSearchComponent', () => {
  let component: ReportListApplicantsAddressSearchComponent;
  let fixture: ComponentFixture<ReportListApplicantsAddressSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListApplicantsAddressSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListApplicantsAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
