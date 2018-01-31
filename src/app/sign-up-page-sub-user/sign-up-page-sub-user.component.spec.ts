import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPageSubUserComponent } from './sign-up-page-sub-user.component';

describe('SignUpPageSubUserComponent', () => {
  let component: SignUpPageSubUserComponent;
  let fixture: ComponentFixture<SignUpPageSubUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPageSubUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageSubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
