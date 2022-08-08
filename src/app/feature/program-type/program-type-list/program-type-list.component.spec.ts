import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramTypeListComponent } from './program-type-list.component';

describe('ProgramTypeListComponent', () => {
  let component: ProgramTypeListComponent;
  let fixture: ComponentFixture<ProgramTypeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
