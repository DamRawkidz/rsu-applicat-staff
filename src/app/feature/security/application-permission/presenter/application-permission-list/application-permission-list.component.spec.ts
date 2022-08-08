import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPermissionListComponent } from './application-permission-list.component';

describe('ApplicationPermissionListComponent', () => {
  let component: ApplicationPermissionListComponent;
  let fixture: ComponentFixture<ApplicationPermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationPermissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
