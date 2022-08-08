import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleFormComponent } from './application-role-form.component';

describe('ApplicationRoleFormComponent', () => {
  let component: ApplicationRoleFormComponent;
  let fixture: ComponentFixture<ApplicationRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
