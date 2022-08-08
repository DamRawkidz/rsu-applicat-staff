import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentTotalApplyOnlineComponent } from './student-total-apply-online.component';

describe('StudentTotalApplyOnlineComponent', () => {
  let component: StudentTotalApplyOnlineComponent;
  let fixture: ComponentFixture<StudentTotalApplyOnlineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTotalApplyOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTotalApplyOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
