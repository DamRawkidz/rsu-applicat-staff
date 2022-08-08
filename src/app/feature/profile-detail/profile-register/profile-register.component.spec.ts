import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileRegisterComponent } from './profile-register.component';

describe('ProfileRegisterComponent', () => {
  let component: ProfileRegisterComponent;
  let fixture: ComponentFixture<ProfileRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
