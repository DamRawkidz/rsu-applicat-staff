import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileDetailFacultyFormComponent } from './profile-detail-faculty-form.component';

describe('ProfileDetailFacultyFormComponent', () => {
  let component: ProfileDetailFacultyFormComponent;
  let fixture: ComponentFixture<ProfileDetailFacultyFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailFacultyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailFacultyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
