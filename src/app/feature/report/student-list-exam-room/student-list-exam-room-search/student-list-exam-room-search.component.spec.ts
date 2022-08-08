import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentListExamRoomSearchComponent } from './student-list-exam-room-search.component';

describe('StudentListExamRoomSearchComponent', () => {
  let component: StudentListExamRoomSearchComponent;
  let fixture: ComponentFixture<StudentListExamRoomSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListExamRoomSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListExamRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
