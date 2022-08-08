import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionList1FormComponent } from './admission-list1-form.component';

describe('AdmissionList1FormComponent', () => {
  let component: AdmissionList1FormComponent;
  let fixture: ComponentFixture<AdmissionList1FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionList1FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionList1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
