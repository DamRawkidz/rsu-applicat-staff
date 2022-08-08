import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportRecruitmentStatisticsListComponent } from './report-recruitment-statistics-list.component';

describe('ReportRecruitmentStatisticsListComponent', () => {
  let component: ReportRecruitmentStatisticsListComponent;
  let fixture: ComponentFixture<ReportRecruitmentStatisticsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRecruitmentStatisticsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRecruitmentStatisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
