import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmissionListComponent } from './addmission-list.component';

describe('AddmissionListComponent', () => {
  let component: AddmissionListComponent;
  let fixture: ComponentFixture<AddmissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
