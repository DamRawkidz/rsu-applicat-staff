import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDataContainerContainer } from './application-data-container.container';

describe('ApplicationDataContainerContainer', () => {
  let component: ApplicationDataContainerContainer;
  let fixture: ComponentFixture<ApplicationDataContainerContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDataContainerContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDataContainerContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
