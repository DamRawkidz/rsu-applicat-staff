import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportShowsTestInformationListComponent } from './report-shows-test-information-list.component';

describe('ReportShowsTestInformationListComponent', () => {
  let component: ReportShowsTestInformationListComponent;
  let fixture: ComponentFixture<ReportShowsTestInformationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportShowsTestInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportShowsTestInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
