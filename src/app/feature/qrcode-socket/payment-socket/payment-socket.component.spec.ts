import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentSocketComponent } from './payment-socket.component';

describe('PaymentSocketComponent', () => {
  let component: PaymentSocketComponent;
  let fixture: ComponentFixture<PaymentSocketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
