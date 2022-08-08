import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QrcodeSocketComponent } from './qrcode-socket.component';

describe('QrcodeSocketComponent', () => {
  let component: QrcodeSocketComponent;
  let fixture: ComponentFixture<QrcodeSocketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
