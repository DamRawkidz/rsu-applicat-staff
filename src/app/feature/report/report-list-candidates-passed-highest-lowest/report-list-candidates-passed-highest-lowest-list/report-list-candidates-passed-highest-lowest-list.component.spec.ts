import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportListCandidatesPassedHighestLowestListComponent } from './report-list-candidates-passed-highest-lowest-list.component';

describe('ReportListCandidatesPassedHighestLowestListComponent', () => {
  let component: ReportListCandidatesPassedHighestLowestListComponent;
  let fixture: ComponentFixture<ReportListCandidatesPassedHighestLowestListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListCandidatesPassedHighestLowestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListCandidatesPassedHighestLowestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
