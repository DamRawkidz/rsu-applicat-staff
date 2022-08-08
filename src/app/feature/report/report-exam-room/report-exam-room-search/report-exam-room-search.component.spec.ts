import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExamRoomSearchComponent } from './report-exam-room-search.component';

describe('ReportExamRoomSearchComponent', () => {
  let component: ReportExamRoomSearchComponent;
  let fixture: ComponentFixture<ReportExamRoomSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportExamRoomSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExamRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
