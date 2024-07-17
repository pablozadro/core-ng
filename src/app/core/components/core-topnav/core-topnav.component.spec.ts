import { Component } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoreTopnavComponent } from './core-topnav.component';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState, initialAuthState } from '@/auth/state/auth.reducer';
import { CORE_DONE_STATUS, CORE_PENDING_STATUS } from '@/core/config';
import { DebugElement } from '@angular/core';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  template: '',
})
export class AuthLoginComponent {}

@Component({
  selector: 'app-core-landing',
  standalone: true,
  template: '',
})
export class AuthProfileComponent {}


describe('CoreTopnavComponent', () => {
  let component: CoreTopnavComponent;
  let fixture: ComponentFixture<CoreTopnavComponent>;
  let store: MockStore;
  let router: Router;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreTopnavComponent
      ],
      providers: [
        provideRouter([
          { path: 'auth/profile', component: AuthProfileComponent },
          { path: 'auth/login', component: AuthLoginComponent },
        ]),
        provideMockStore({ initialState: initialAuthState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTopnavComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
    fixture.detectChanges();
    harness.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('token', () => {

    it('should subscribe and set token', () => {
      expect(component.token).toEqual('');
      const state: AuthState = {
        status: CORE_DONE_STATUS,
        error: '',
        token: 'abc123',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      expect(component.token).toEqual('abc123');
    });
  });


  describe('Links', () => {

    it('should set login link if no token', () => {
      const state: AuthState = {
        status: CORE_PENDING_STATUS,
        error: '',
        token: '',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      expect(component.token).toEqual('');
      let a: DebugElement = fixture.debugElement.query(By.css('[data-id="logged-link"]'));
      expect(a.nativeElement.textContent).toEqual('Login');
    });

    it('login link should navigate to login page', fakeAsync(() => {
      const state: AuthState = {
        status: CORE_PENDING_STATUS,
        error: '',
        token: '',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      let a: DebugElement = fixture.debugElement.query(By.css('[data-id="logged-link"]'));
      a.nativeElement.click();
      tick();
      expect(router.url).toEqual('/auth/login');
    }));

    it('should set welcome link if token', () => {
      const state: AuthState = {
        status: CORE_DONE_STATUS,
        error: '',
        token: 'abc123',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      expect(component.token).toEqual('abc123');
      let a: DebugElement = fixture.debugElement.query(By.css('[data-id="logged-link"]'));
      expect(a.nativeElement.textContent).toEqual('Welcome');
    });

    it('welcome link should navigate to landing page', fakeAsync(() => {
      const state: AuthState = {
        status: CORE_DONE_STATUS,
        error: '',
        token: 'abc123',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      let a: DebugElement = fixture.debugElement.query(By.css('[data-id="logged-link"]'));
      a.nativeElement.click();
      tick();
      expect(router.url).toEqual('/auth/profile');
    }));
  });

});
