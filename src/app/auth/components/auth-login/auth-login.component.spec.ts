import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import config from '@app/config';
import { login } from '@app/auth/state/auth.actions';
import { AuthLoginComponent } from './auth-login.component';
import { AuthLoginBody } from '@app/auth/services/auth-api.service';


describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let store: MockStore;

  const authInitialStateMock = {
    user: null,
    loginStatus: config.status.PENDING,
    loginError: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ AuthLoginComponent ],
      providers: [
        provideMockStore({ initialState: { auth: authInitialStateMock } }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation: ', () => {

    it('should validate that email and password are required', () => {
      component.form.setValue({ email: '', password: '' });
      expect(component.email.errors?.['required']).toBeTruthy();
      expect(component.password.errors?.['required']).toBeTruthy();
      expect(component.form.status).toBe('INVALID');
    });


    it('should validate password min length', () => {
      component.form.setValue({ 
        email: 'developer@localhost', 
        password: 'abc' 
      });
      expect(component.password.errors?.['minlength']).toBeTruthy();      
      expect(component.email.status).toBe('VALID');
      expect(component.form.status).toBe('INVALID');
    });

    it('should validate password max length', () => {
      component.form.setValue({ 
        email: 'developer@localhost', 
        password: 'abcdefghijk1234567890' 
      });
      expect(component.password.errors?.['maxlength']).toBeTruthy();      
      expect(component.email.status).toBe('VALID');
      expect(component.form.status).toBe('INVALID');
    });
  });


  describe('On Submit: ', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should NOT dispatch login action if form is INVALID', () => {
      component.form.setValue({ email: '', password: '' });
      component.onSubmit();
      expect(component.form.status).toEqual('INVALID');
      expect(store.dispatch).not.toHaveBeenCalledTimes(1);
    });

    it('should dispatch login action if form is VALID', () => {
      const body: AuthLoginBody = { email: 'developer@localhost', password: 'abc123' };
      component.form.setValue(body);
      component.onSubmit();
      expect(component.form.status).toEqual('VALID');
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(login({ body }));
    });
  });


  describe('Initial State: ', () => {
    const initialState = {
      user: null,
      loginStatus: config.status.PENDING,
      loginError: '',
    };

    beforeEach(() => {
      store.setState({ auth: initialState });
    });

    it('should init login status properly', (done: any) => {
      component.loginStatus$.subscribe(status => {
        expect(status).toEqual(config.status.PENDING);
        done();
      });
    });

    it('should init login error properly', (done: any) => {
      component.loginError$.subscribe(error => {
        expect(error).toEqual('');
        done();
      });
    });
  });


  describe('InProgress State: ', () => {
    const inProgressState = {
      user: null,
      loginStatus: config.status.IN_PROGRESS,
      loginError: '',
    };

    beforeEach(() => {
      store.setState({ auth: inProgressState });
    });

    it('should update login status properly', (done: any) => {
      component.loginStatus$.subscribe(status => {
        expect(status).toEqual(config.status.IN_PROGRESS);
        done();
      });
    });

    it('should update login error properly', (done: any) => {
        component.loginError$.subscribe(error => {
        expect(error).toEqual('');
        done();
        });
    });
  });


  describe('Completed State: ', () => {
    const completedState = {
      user: { id: 1, email: 'mock@localhost.io'},
      loginStatus: config.status.COMPLETED,
      loginError: '',
    };

    beforeEach(() => {
      store.setState({ auth: completedState });
    });

    it('should update login status properly', (done: any) => {
      component.loginStatus$.subscribe(status => {
        expect(status).toEqual(config.status.COMPLETED);
        done();
      });
    });

    it('should update login error properly', (done: any) => {
      component.loginError$.subscribe(error => {
        expect(error).toEqual('');
        done();
      });
    });
  });


  describe('Error State: ', () => {
    const loginError = 'Mocked login error.';

    const errorState = {
      user: null,
      loginStatus: config.status.COMPLETED,
      loginError
    };


    beforeEach(() => {
      store.setState({ auth: errorState });
    });

    it('should update login status properly', (done: any) => {
      component.loginStatus$.subscribe(status => {
        expect(status).toEqual(config.status.COMPLETED);
        done();
      });
    });

    it('should update login error properly', (done: any) => {
      component.loginError$.subscribe(error => {
        expect(error).toEqual(loginError);
        done();
      });
    });
  });
});
