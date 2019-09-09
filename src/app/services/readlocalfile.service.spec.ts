import { TestBed } from '@angular/core/testing';

import { ReadlocalfileService } from './readlocalfile.service';

describe('ReadlocalfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadlocalfileService = TestBed.get(ReadlocalfileService);
    expect(service).toBeTruthy();
  });
});
