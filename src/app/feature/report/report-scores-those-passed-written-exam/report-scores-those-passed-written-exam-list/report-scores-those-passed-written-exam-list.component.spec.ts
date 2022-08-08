import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportScoresThosePassedWrittenExamListComponent } from './report-scores-those-passed-written-exam-list.component';

describe('ReportScoresThosePassedWrittenExamListComponent', () => {
  let component: ReportScoresThosePassedWrittenExamListComponent;
  let fixture: ComponentFixture<ReportScoresThosePassedWrittenExamListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportScoresThosePassedWrittenExamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportScoresThosePassedWrittenExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
