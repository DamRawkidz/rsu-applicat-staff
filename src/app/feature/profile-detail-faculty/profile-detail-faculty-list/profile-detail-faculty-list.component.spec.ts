import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileDetailFacultyListComponent } from './profile-detail-faculty-list.component';

describe('ProfileDetailFacultyListComponent', () => {
  let component: ProfileDetailFacultyListComponent;
  let fixture: ComponentFixture<ProfileDetailFacultyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailFacultyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailFacultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
