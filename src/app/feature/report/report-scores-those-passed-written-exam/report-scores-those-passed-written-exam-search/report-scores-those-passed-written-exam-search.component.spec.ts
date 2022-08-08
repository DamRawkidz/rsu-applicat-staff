import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportScoresThosePassedWrittenExamSearchComponent } from './report-scores-those-passed-written-exam-search.component';

describe('ReportScoresThosePassedWrittenExamSearchComponent', () => {
  let component: ReportScoresThosePassedWrittenExamSearchComponent;
  let fixture: ComponentFixture<ReportScoresThosePassedWrittenExamSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportScoresThosePassedWrittenExamSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportScoresThosePassedWrittenExamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
