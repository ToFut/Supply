import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProductsComponent } from './dialog-edit-products.component';

describe('DialogEditProductsComponent', () => {
  let component: DialogEditProductsComponent;
  let fixture: ComponentFixture<DialogEditProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
