import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcademicYearsListComponent } from './academic-years-list.component';

describe('AcademicYearsListComponent', () => {
  let component: AcademicYearsListComponent;
  let fixture: ComponentFixture<AcademicYearsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicYearsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
