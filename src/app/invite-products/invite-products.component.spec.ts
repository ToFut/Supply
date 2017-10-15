import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteProductsComponent } from './invite-products.component';

describe('InviteProductsComponent', () => {
  let component: InviteProductsComponent;
  let fixture: ComponentFixture<InviteProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
