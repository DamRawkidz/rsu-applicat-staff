import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupSearchProvinceComponent } from './popup-search-province.component';

describe('PopupSearchProvinceComponent', () => {
  let component: PopupSearchProvinceComponent;
  let fixture: ComponentFixture<PopupSearchProvinceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSearchProvinceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSearchProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
