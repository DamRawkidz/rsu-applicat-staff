import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupSearchSchoolComponent } from './popup-search-school.component';

describe('PopupSearchSchoolComponent', () => {
  let component: PopupSearchSchoolComponent;
  let fixture: ComponentFixture<PopupSearchSchoolComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSearchSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSearchSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
