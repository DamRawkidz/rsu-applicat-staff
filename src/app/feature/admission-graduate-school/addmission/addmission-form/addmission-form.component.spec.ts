import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmissionFormComponent } from './addmission-form.component';

describe('AddmissionFormComponent', () => {
  let component: AddmissionFormComponent;
  let fixture: ComponentFixture<AddmissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
