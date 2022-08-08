import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionList1ListComponent } from './admission-list1-list.component';

describe('AdmissionList1ListComponent', () => {
  let component: AdmissionList1ListComponent;
  let fixture: ComponentFixture<AdmissionList1ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionList1ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionList1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
