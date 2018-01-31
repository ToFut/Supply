import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisticsComponent } from './satistics.component';

describe('SatisticsComponent', () => {
  let component: SatisticsComponent;
  let fixture: ComponentFixture<SatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
