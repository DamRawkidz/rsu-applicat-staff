import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationObjectListComponent } from './application-object-list.component';

describe('ApplicationObjectListComponent', () => {
  let component: ApplicationObjectListComponent;
  let fixture: ComponentFixture<ApplicationObjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationObjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
