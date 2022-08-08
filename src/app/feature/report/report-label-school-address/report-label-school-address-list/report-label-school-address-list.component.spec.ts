import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportLabelSchoolAddressListComponent } from './report-label-school-address-list.component';

describe('ReportLabelSchoolAddressListComponent', () => {
  let component: ReportLabelSchoolAddressListComponent;
  let fixture: ComponentFixture<ReportLabelSchoolAddressListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLabelSchoolAddressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLabelSchoolAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
