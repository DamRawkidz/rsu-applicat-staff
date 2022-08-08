import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUserSearchComponent } from './application-user-search.component';

describe('ApplicationUserSearchComponent', () => {
  let component: ApplicationUserSearchComponent;
  let fixture: ComponentFixture<ApplicationUserSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationUserSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
