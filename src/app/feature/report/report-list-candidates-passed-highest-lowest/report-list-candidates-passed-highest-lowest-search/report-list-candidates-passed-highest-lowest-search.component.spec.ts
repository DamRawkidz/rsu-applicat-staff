import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListCandidatesPassedHighestLowestSearchComponent } from './report-list-candidates-passed-highest-lowest-search.component';

describe('ReportListCandidatesPassedHighestLowestSearchComponent', () => {
  let component: ReportListCandidatesPassedHighestLowestSearchComponent;
  let fixture: ComponentFixture<ReportListCandidatesPassedHighestLowestSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListCandidatesPassedHighestLowestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListCandidatesPassedHighestLowestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
