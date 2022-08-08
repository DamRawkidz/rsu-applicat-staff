import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataFormComponent } from './application-data-form.component';

describe('ApplicationDataFormComponent', () => {
  let component: ApplicationDataFormComponent;
  let fixture: ComponentFixture<ApplicationDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
