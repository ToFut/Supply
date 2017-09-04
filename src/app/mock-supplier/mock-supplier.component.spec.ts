import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockSupplierComponent } from './mock-supplier.component';

describe('MockSupplierComponent', () => {
  let component: MockSupplierComponent;
  let fixture: ComponentFixture<MockSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
