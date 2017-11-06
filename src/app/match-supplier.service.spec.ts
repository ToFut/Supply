import { TestBed, inject } from '@angular/core/testing';

import { MatchSupplierService } from './match-supplier.service';

describe('MatchSupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchSupplierService]
    });
  });

  it('should be created', inject([MatchSupplierService], (service: MatchSupplierService) => {
    expect(service).toBeTruthy();
  }));
});
