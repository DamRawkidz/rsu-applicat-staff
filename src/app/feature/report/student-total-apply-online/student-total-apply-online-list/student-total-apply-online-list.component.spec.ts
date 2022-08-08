import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentTotalApplyOnlineListComponent } from './student-total-apply-online-list.component';

describe('StudentTotalApplyOnlineListComponent', () => {
  let component: StudentTotalApplyOnlineListComponent;
  let fixture: ComponentFixture<StudentTotalApplyOnlineListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTotalApplyOnlineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTotalApplyOnlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
