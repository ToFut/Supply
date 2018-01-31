import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserReciveListComponent } from './sub-user-recive-list.component';

describe('SubUserReciveListComponent', () => {
  let component: SubUserReciveListComponent;
  let fixture: ComponentFixture<SubUserReciveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserReciveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserReciveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
