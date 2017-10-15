import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllSupplierComponent } from './show-all-supplier.component';

describe('ShowAllSupplierComponent', () => {
  let component: ShowAllSupplierComponent;
  let fixture: ComponentFixture<ShowAllSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
