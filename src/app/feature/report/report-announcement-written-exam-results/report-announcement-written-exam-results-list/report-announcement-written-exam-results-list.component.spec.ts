import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportAnnouncementWrittenExamResultsListComponent } from './report-announcement-written-exam-results-list.component';

describe('ReportAnnouncementWrittenExamResultsListComponent', () => {
  let component: ReportAnnouncementWrittenExamResultsListComponent;
  let fixture: ComponentFixture<ReportAnnouncementWrittenExamResultsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAnnouncementWrittenExamResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnnouncementWrittenExamResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
