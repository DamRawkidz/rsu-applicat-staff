import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessPopupComponent } from './process-popup.component';

describe('ProcessPopupComponent', () => {
  let component: ProcessPopupComponent;
  let fixture: ComponentFixture<ProcessPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
