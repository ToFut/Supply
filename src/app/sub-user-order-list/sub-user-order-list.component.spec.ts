import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserOrderListComponent } from './sub-user-order-list.component';

describe('SubUserOrderListComponent', () => {
  let component: SubUserOrderListComponent;
  let fixture: ComponentFixture<SubUserOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
