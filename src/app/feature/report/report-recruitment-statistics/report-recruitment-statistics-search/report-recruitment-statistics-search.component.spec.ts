import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportRecruitmentStatisticsSearchComponent } from './report-recruitment-statistics-search.component';

describe('ReportRecruitmentStatisticsSearchComponent', () => {
  let component: ReportRecruitmentStatisticsSearchComponent;
  let fixture: ComponentFixture<ReportRecruitmentStatisticsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRecruitmentStatisticsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRecruitmentStatisticsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
