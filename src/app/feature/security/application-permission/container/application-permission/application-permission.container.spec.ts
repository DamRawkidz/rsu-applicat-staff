import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPermissionContainer } from './application-permission.container';

describe('ApplicationPermissionContainer', () => {
  let component: ApplicationPermissionContainer;
  let fixture: ComponentFixture<ApplicationPermissionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationPermissionContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPermissionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
