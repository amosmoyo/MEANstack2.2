import { TestBed } from '@angular/core/testing';

import { AmosService } from './amos.service';

describe('AmosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmosService = TestBed.get(AmosService);
    expect(service).toBeTruthy();
  });
});
