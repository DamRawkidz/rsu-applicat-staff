import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EducationLevelFormComponent } from './education-level-form.component';

describe('EducationLevelFormComponent', () => {
  let component: EducationLevelFormComponent;
  let fixture: ComponentFixture<EducationLevelFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationLevelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
