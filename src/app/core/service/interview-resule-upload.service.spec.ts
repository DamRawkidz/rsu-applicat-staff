import { TestBed } from '@angular/core/testing';

import { InterviewResuleUploadService } from './interview-resule-upload.service';

describe('InterviewResuleUploadService', () => {
  let service: InterviewResuleUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewResuleUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
