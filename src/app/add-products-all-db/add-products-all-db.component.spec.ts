import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsAllDBComponent } from './add-products-all-db.component';

describe('AddProductsAllDBComponent', () => {
  let component: AddProductsAllDBComponent;
  let fixture: ComponentFixture<AddProductsAllDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsAllDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsAllDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
