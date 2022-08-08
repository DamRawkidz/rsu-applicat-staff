import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportShowsTestInformationSearchComponent } from './report-shows-test-information-search.component';

describe('ReportShowsTestInformationSearchComponent', () => {
  let component: ReportShowsTestInformationSearchComponent;
  let fixture: ComponentFixture<ReportShowsTestInformationSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportShowsTestInformationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportShowsTestInformationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
