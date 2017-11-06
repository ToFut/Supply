import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveOrderComponent } from './recive-order.component';

describe('ReciveOrderComponent', () => {
  let component: ReciveOrderComponent;
  let fixture: ComponentFixture<ReciveOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciveOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
