import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPermissionFormComponent } from './application-permission-form.component';

describe('ApplicationPermissionFormComponent', () => {
  let component: ApplicationPermissionFormComponent;
  let fixture: ComponentFixture<ApplicationPermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationPermissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
