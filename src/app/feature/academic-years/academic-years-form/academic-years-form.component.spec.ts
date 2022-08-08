import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcademicYearsFormComponent } from './academic-years-form.component';

describe('AcademicYearsFormComponent', () => {
  let component: AcademicYearsFormComponent;
  let fixture: ComponentFixture<AcademicYearsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicYearsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
