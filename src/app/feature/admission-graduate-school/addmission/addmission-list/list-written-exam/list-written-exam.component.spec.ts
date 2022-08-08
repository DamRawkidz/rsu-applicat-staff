import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWrittenExamComponent } from './list-written-exam.component';

describe('ListWrittenExamComponent', () => {
  let component: ListWrittenExamComponent;
  let fixture: ComponentFixture<ListWrittenExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWrittenExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWrittenExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
