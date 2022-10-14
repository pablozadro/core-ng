import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { logout } from '@app/auth/state/auth.actions';

import config from '@app/config';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTopnavComponent } from './core-topnav.component';


describe('CoreTopnavComponent', () => {
  let router: Router;
  let store: MockStore;

  let component: CoreTopnavComponent;
  let fixture: ComponentFixture<CoreTopnavComponent>;

  const initialState = {
    user: null,
    loginStatus: config.status.PENDING,
    loginError: null,
  };

  const noUserState = {
    user: null,
    loginStatus: config.status.COMPLETED,
    loginError: null,
  };

  const userState = {
    user: { id: 1, email: 'developer@localhost.io' },
    loginStatus: config.status.COMPLETED,
    loginError: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ 
        CoreTopnavComponent,
      ],
      providers: [
        provideMockStore({ initialState: { auth: initialState } }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTopnavComponent);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;

    spyOn(router, 'navigateByUrl').and.callFake(
      (url: string): Promise<boolean> => Promise.resolve(true)
    );

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Logout', () => {

    it('should dispatch logout action', () => {
      component.logout();
      expect(store.dispatch).toHaveBeenCalledOnceWith(logout());
    });
  });


  describe('Menu bar Items', () => {

    it('should init menu items properly with initial state', () => {
      store.setState({ auth: initialState });
      expect(component.links.length).toEqual(1);
      expect(component.links[0]).toBe(component.loginLink);
    });

    it('should render menu items properly if there is NOT an user logged in', () => {
      store.setState({ auth: noUserState });
      expect(component.links.length).toEqual(1);
      expect(component.links[0]).toBe(component.loginLink);
    });

    it('should render menu items properly if there is an user logged in', () => {
      store.setState({ auth: userState });
      expect(component.links.length).toEqual(2);
      expect(component.links[0]).toBe(component.authProfileLink);
      expect(component.links[1]).toBe(component.logoutLink);
    });
  });

});
