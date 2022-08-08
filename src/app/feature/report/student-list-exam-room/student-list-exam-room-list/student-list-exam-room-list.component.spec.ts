import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentListExamRoomListComponent } from './student-list-exam-room-list.component';

describe('StudentListExamRoomListComponent', () => {
  let component: StudentListExamRoomListComponent;
  let fixture: ComponentFixture<StudentListExamRoomListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListExamRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListExamRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
