import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { initialAppState } from '@/app.reducer';
import { CORE_DONE_STATUS, CoreThemeService } from 'core-x';
import { logout } from '@/auth/state/auth.actions';
import { AuthApiService } from '@/auth/services/auth-api.service';


const CoreThemeServiceMock = {
  toggleTheme: jasmine.createSpy('toggleTheme'),
  initTheme: jasmine.createSpy('initTheme'),
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let el: HTMLElement;
  let store: MockStore<any>;
  let authApiService: AuthApiService;
  let coreThemeService: CoreThemeService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideHttpClient(),
        provideMockStore({ initialState: initialAppState }),
        provideRouter([]),
        AuthApiService,
        { provide: CoreThemeService, useValue: CoreThemeServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    store = TestBed.inject(MockStore);
    authApiService = TestBed.inject(AuthApiService);
    coreThemeService = TestBed.inject(CoreThemeService);
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  describe('Rendered components', () => {

    it('should render <core-topnav>', () => {
      const topnav = el.querySelector('core-topnav');
      expect(topnav).toBeTruthy();
    });

    it('should render <app-core-footer>', () => {
      const footer = el.querySelector('app-core-footer');
      expect(footer).toBeTruthy();
    });
  })


  describe('Token', () => {
    const token = 'abc123';

    beforeEach(() => {
      store.setState({
        app: {
          auth: {
            status: CORE_DONE_STATUS,
            error: '',
            token,
          }
        }
      });
      fixture.detectChanges();
    });

    it('should set token', () => {
      expect(component.token).toEqual(token);
    });

    xit('should render profile link', () => {
      spyOn(authApiService, 'getToken').and.returnValue('abc123');
      spyOn(authApiService, 'getUser').and.returnValue({
        email: 'foo@localhost.io',
        iat: 1,
        exp: 1,
      });
      const profileLink = el.querySelector('[data-id=profile-link]');
      expect(profileLink).toBeTruthy();
      expect(profileLink?.textContent).toEqual('foo@localhost.io');
      expect(profileLink?.getAttribute('routerLink')).toEqual('/auth/profile');
    });

    it('should render logut button', () => {
      const logoutButton = el.querySelector('[data-id=logout-btn]');
      expect(logoutButton).toBeTruthy();
      expect(logoutButton?.getAttribute('label')).toEqual('Logout');
    });
  });


  describe('No Token', () => {

    beforeEach(() => {
      store.setState({
        app: {
          auth: {
            status: CORE_DONE_STATUS,
            error: '',
            token: '',
          }
        }
      });
      fixture.detectChanges();
    });

    it('should render login link', () => {
      const loginLink = el.querySelector('[data-id=login-link]');
      expect(loginLink).toBeTruthy();
      expect(loginLink?.textContent).toEqual('Login');
      expect(loginLink?.getAttribute('routerLink')).toEqual('/auth/login');
    });
  });


  describe('onLogout()', () => {

    it('should dispatch logout() action', () => {
      spyOn(store, 'dispatch').and.callThrough();
      component.onLogout();
      expect(store.dispatch).toHaveBeenCalledOnceWith(logout());
    });

    it('on click button should call onLogout()', () => {
      spyOn(component, 'onLogout').and.callThrough();
      store.setState({
        app: {
          auth: {
            status: CORE_DONE_STATUS,
            error: '',
            token: 'abc123',
          }
        }
      });
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('[data-id=logout-btn]'));
      btn.triggerEventHandler('click');
      expect(component.onLogout).toHaveBeenCalledTimes(1);
    });
  });


  describe('onToogleTheme()', () => {

    it('should call toggleTheme() action', () => {
      component.onToggleTheme();
      expect(coreThemeService.toggleTheme).toHaveBeenCalled();
    });

    it('on click button should call onThemeToggler()', () => {
      spyOn(component, 'onToggleTheme').and.callThrough();
      const btn = fixture.debugElement.query(By.css('[data-id=theme-toggler-btn]'));
      btn.triggerEventHandler('click');
      expect(component.onToggleTheme).toHaveBeenCalledTimes(1);
    });
  });
});
