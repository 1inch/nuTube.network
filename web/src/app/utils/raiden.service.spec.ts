import { TestBed } from '@angular/core/testing';

import { RaidenService } from './raiden.service';

describe('RaidenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaidenService = TestBed.get(RaidenService);
    expect(service).toBeTruthy();
  });
});
