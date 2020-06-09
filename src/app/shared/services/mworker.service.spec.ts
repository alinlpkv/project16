import { TestBed } from '@angular/core/testing';

import { MworkerService } from './mworker.service';

describe('MworkerService', () => {
  let service: MworkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MworkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
