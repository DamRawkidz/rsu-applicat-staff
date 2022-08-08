import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListApplicantsAddressListComponent } from './report-list-applicants-address-list.component';

describe('ReportListApplicantsAddressListComponent', () => {
  let component: ReportListApplicantsAddressListComponent;
  let fixture: ComponentFixture<ReportListApplicantsAddressListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListApplicantsAddressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListApplicantsAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
