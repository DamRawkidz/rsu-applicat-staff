import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationObjectSearchComponent } from './application-object-search.component';

describe('ApplicationObjectSearchComponent', () => {
  let component: ApplicationObjectSearchComponent;
  let fixture: ComponentFixture<ApplicationObjectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationObjectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationObjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
