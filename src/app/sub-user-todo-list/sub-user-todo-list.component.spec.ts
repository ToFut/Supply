import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserTodoListComponent } from './sub-user-todo-list.component';

describe('SubUserTodoListComponent', () => {
  let component: SubUserTodoListComponent;
  let fixture: ComponentFixture<SubUserTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
