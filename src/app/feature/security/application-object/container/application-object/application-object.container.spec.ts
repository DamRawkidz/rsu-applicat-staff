import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationObjectContainer } from './application-object.container';

describe('ApplicationObjectContainer', () => {
  let component: ApplicationObjectContainer;
  let fixture: ComponentFixture<ApplicationObjectContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationObjectContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationObjectContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
