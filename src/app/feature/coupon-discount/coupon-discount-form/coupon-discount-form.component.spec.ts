import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CouponDiscountFormComponent } from './coupon-discount-form.component';

describe('CouponDiscountFormComponent', () => {
  let component: CouponDiscountFormComponent;
  let fixture: ComponentFixture<CouponDiscountFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponDiscountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDiscountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
