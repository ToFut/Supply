import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAfterLoginComponent } from './home-after-login.component';

describe('HomeAfterLoginComponent', () => {
  let component: HomeAfterLoginComponent;
  let fixture: ComponentFixture<HomeAfterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAfterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
