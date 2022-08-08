import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataListComponent } from './application-data-list.component';

describe('ApplicationDataListComponent', () => {
  let component: ApplicationDataListComponent;
  let fixture: ComponentFixture<ApplicationDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
