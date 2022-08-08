import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleContainer } from './application-role.container';

describe('ApplicationRoleContainer', () => {
  let component: ApplicationRoleContainer;
  let fixture: ComponentFixture<ApplicationRoleContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRoleContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoleContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
