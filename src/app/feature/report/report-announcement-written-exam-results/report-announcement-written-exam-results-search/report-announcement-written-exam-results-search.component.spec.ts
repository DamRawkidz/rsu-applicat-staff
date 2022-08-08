import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportAnnouncementWrittenExamResultsSearchComponent } from './report-announcement-written-exam-results-search.component';

describe('ReportAnnouncementWrittenExamResultsSearchComponent', () => {
  let component: ReportAnnouncementWrittenExamResultsSearchComponent;
  let fixture: ComponentFixture<ReportAnnouncementWrittenExamResultsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAnnouncementWrittenExamResultsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnnouncementWrittenExamResultsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
