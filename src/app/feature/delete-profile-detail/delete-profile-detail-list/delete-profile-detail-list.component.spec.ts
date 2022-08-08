import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteProfileDetailListComponent } from './delete-profile-detail-list.component';

describe('DeleteProfileDetailListComponent', () => {
  let component: DeleteProfileDetailListComponent;
  let fixture: ComponentFixture<DeleteProfileDetailListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProfileDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
