import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmAdmissionListComponent } from './confirm-admission-list.component';

describe('ConfirmAdmissionListComponent', () => {
  let component: ConfirmAdmissionListComponent;
  let fixture: ComponentFixture<ConfirmAdmissionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAdmissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAdmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
