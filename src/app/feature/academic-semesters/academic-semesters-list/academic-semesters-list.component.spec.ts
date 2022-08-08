import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcademicSemestersListComponent } from './academic-semesters-list.component';

describe('AcademicSemestersListComponent', () => {
  let component: AcademicSemestersListComponent;
  let fixture: ComponentFixture<AcademicSemestersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicSemestersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicSemestersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
