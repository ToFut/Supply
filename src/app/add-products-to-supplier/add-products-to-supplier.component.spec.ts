import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsToSupplierComponent } from './add-products-to-supplier.component';

describe('AddProductsToSupplierComponent', () => {
  let component: AddProductsToSupplierComponent;
  let fixture: ComponentFixture<AddProductsToSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsToSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsToSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
