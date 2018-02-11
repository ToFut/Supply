import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderComponent } from './accept-order.component';

describe('AcceptOrderComponent', () => {
  let component: AcceptOrderComponent;
  let fixture: ComponentFixture<AcceptOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});