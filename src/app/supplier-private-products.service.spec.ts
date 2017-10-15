import { TestBed, inject } from '@angular/core/testing';

import { SupplierPrivateProductsService } from './supplier-private-products.service';

describe('SupplierPrivateProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierPrivateProductsService]
    });
  });

  it('should be created', inject([SupplierPrivateProductsService], (service: SupplierPrivateProductsService) => {
    expect(service).toBeTruthy();
  }));
});
