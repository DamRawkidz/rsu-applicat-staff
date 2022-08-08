import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationObjectFormComponent } from './application-object-form.component';

describe('ApplicationObjectFormComponent', () => {
  let component: ApplicationObjectFormComponent;
  let fixture: ComponentFixture<ApplicationObjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationObjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationObjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
