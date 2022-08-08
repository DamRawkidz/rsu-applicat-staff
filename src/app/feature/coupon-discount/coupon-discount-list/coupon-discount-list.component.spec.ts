import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CouponDiscountListComponent } from './coupon-discount-list.component';

describe('CouponDiscountListComponent', () => {
  let component: CouponDiscountListComponent;
  let fixture: ComponentFixture<CouponDiscountListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponDiscountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
