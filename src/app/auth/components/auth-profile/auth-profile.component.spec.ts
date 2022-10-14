import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import config from '@app/config';
import { AuthProfileComponent } from './auth-profile.component';


describe('AuthProfileComponent', () => {
  let component: AuthProfileComponent;
  let fixture: ComponentFixture<AuthProfileComponent>;
  let store: MockStore;

  const authInitialStateMock = {
    user: null,
    loginStatus: config.status.PENDING,
    loginError: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthProfileComponent ],
      providers: [
        provideMockStore({ initialState: { auth: authInitialStateMock }}),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
