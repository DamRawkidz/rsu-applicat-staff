import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentRegisterPlansPopupComponent } from './payment-register-plans-popup.component';

describe('PaymentRegisterPlansPopupComponent', () => {
  let component: PaymentRegisterPlansPopupComponent;
  let fixture: ComponentFixture<PaymentRegisterPlansPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRegisterPlansPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRegisterPlansPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
