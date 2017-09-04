import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerConnectionComponent } from './server-connection.component';

describe('ServerConnectionComponent', () => {
  let component: ServerConnectionComponent;
  let fixture: ComponentFixture<ServerConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
