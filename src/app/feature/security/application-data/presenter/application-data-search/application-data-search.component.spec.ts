import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataSearchComponent } from './application-data-search.component';

describe('ApplicationDataSearchComponent', () => {
  let component: ApplicationDataSearchComponent;
  let fixture: ComponentFixture<ApplicationDataSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDataSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
