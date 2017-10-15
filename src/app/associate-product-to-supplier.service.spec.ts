import { TestBed, inject } from '@angular/core/testing';

import { AssociateProductToSupplierService } from './associate-product-to-supplier.service';

describe('AssociateProductToSupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociateProductToSupplierService]
    });
  });

  it('should be created', inject([AssociateProductToSupplierService], (service: AssociateProductToSupplierService) => {
    expect(service).toBeTruthy();
  }));
});
