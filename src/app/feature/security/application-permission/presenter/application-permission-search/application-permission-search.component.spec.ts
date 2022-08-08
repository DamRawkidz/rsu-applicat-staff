import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPermissionSearchComponent } from './application-permission-search.component';

describe('ApplicationPermissionSearchComponent', () => {
  let component: ApplicationPermissionSearchComponent;
  let fixture: ComponentFixture<ApplicationPermissionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationPermissionSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPermissionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
