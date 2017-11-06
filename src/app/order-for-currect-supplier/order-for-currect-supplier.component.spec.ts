import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForCurrectSupplierComponent } from './order-for-currect-supplier.component';

describe('OrderForCurrectSupplierComponent', () => {
  let component: OrderForCurrectSupplierComponent;
  let fixture: ComponentFixture<OrderForCurrectSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderForCurrectSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderForCurrectSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
