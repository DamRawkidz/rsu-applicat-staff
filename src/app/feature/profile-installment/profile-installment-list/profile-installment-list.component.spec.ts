import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInstallmentListComponent } from './profile-installment-list.component';

describe('ProfileInstallmentListComponent', () => {
  let component: ProfileInstallmentListComponent;
  let fixture: ComponentFixture<ProfileInstallmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInstallmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInstallmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
