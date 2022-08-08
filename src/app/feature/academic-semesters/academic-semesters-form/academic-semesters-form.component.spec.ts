import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcademicSemestersFormComponent } from './academic-semesters-form.component';

describe('AcademicSemestersFormComponent', () => {
  let component: AcademicSemestersFormComponent;
  let fixture: ComponentFixture<AcademicSemestersFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicSemestersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicSemestersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
