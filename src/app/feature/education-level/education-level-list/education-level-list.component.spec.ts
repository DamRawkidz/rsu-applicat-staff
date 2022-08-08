import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EducationLevelListComponent } from './education-level-list.component';

describe('EducationLevelListComponent', () => {
  let component: EducationLevelListComponent;
  let fixture: ComponentFixture<EducationLevelListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
