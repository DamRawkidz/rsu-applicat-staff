import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramTypeFormComponent } from './program-type-form.component';

describe('ProgramTypeFormComponent', () => {
  let component: ProgramTypeFormComponent;
  let fixture: ComponentFixture<ProgramTypeFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
