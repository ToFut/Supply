import { TestBed, inject } from '@angular/core/testing';

import { ReturnProductsService } from './return-products.service';

describe('ReturnProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnProductsService]
    });
  });

  it('should be created', inject([ReturnProductsService], (service: ReturnProductsService) => {
    expect(service).toBeTruthy();
  }));
});
