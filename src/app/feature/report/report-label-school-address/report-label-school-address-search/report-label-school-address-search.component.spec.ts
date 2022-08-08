import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportLabelSchoolAddressSearchComponent } from './report-label-school-address-search.component';

describe('ReportLabelSchoolAddressSearchComponent', () => {
  let component: ReportLabelSchoolAddressSearchComponent;
  let fixture: ComponentFixture<ReportLabelSchoolAddressSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLabelSchoolAddressSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLabelSchoolAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
