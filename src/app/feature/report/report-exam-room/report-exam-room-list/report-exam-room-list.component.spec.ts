import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportExamRoomListComponent } from './report-exam-room-list.component';

describe('ReportExamRoomListComponent', () => {
  let component: ReportExamRoomListComponent;
  let fixture: ComponentFixture<ReportExamRoomListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExamRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExamRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
