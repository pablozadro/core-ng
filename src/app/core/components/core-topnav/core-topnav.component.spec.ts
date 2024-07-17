import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreTopnavComponent } from './core-topnav.component';
import { provideRouter, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState, initialAuthState } from '@/auth/state/auth.reducer';
import { CORE_DONE_STATUS, CORE_PENDING_STATUS } from '@/core/config';



describe('CoreTopnavComponent', () => {
  let component: CoreTopnavComponent;
  let fixture: ComponentFixture<CoreTopnavComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreTopnavComponent
      ],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState: initialAuthState })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTopnavComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
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


  describe('logged link', () => {

    it('should set login link if no token', () => {
      const state: AuthState = {
        status: CORE_PENDING_STATUS,
        error: '',
        token: '',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      expect(component.token).toEqual('');
      const a = fixture.nativeElement.querySelector('[data-id=logged-link]');
      expect(a.textContent).toEqual('Login');
    });

    it('should set welcome link if token', () => {
      const state: AuthState = {
        status: CORE_DONE_STATUS,
        error: '',
        token: 'abc123',
      }
      store.setState({ auth: state });
      fixture.detectChanges();
      expect(component.token).toEqual('abc123');
      const a = fixture.nativeElement.querySelector('[data-id=logged-link]');
      expect(a.textContent).toEqual('Welcome');
    })
  });

});
