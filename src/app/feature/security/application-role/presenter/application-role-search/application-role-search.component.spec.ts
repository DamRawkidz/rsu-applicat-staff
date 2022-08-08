import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleSearchComponent } from './application-role-search.component';

describe('ApplicationRoleSearchComponent', () => {
  let component: ApplicationRoleSearchComponent;
  let fixture: ComponentFixture<ApplicationRoleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRoleSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
