import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleListComponent } from './application-role-list.component';

describe('ApplicationRoleListComponent', () => {
  let component: ApplicationRoleListComponent;
  let fixture: ComponentFixture<ApplicationRoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRoleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
