import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcceptedComponent } from './list-accepted.component';

describe('ListAcceptedComponent', () => {
  let component: ListAcceptedComponent;
  let fixture: ComponentFixture<ListAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
