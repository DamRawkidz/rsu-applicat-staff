import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUserFormComponent } from './application-user-form.component';

describe('ApplicationUserFormComponent', () => {
  let component: ApplicationUserFormComponent;
  let fixture: ComponentFixture<ApplicationUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
