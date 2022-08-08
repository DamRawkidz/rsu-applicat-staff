import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportContactListComponent } from './import-contact-list.component';

describe('ImportContactListComponent', () => {
  let component: ImportContactListComponent;
  let fixture: ComponentFixture<ImportContactListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
