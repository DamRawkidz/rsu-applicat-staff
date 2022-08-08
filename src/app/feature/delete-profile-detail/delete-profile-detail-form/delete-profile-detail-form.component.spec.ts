import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteProfileDetailFormComponent } from './delete-profile-detail-form.component';

describe('DeleteProfileDetailFormComponent', () => {
  let component: DeleteProfileDetailFormComponent;
  let fixture: ComponentFixture<DeleteProfileDetailFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfileDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
