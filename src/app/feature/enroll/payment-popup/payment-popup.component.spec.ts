import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentPopupComponent } from './payment-popup.component';

describe('PaymentPopupComponent', () => {
  let component: PaymentPopupComponent;
  let fixture: ComponentFixture<PaymentPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
