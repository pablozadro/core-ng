import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import config from '@app/config';
import { AppComponent } from '@app/app.component';
import { AuthApiService } from '@app/auth/services/auth-api.service';
import { AuthApiServiceMock } from '@app/auth/mocks/auth-api.service.mock';
import { loadLoggedUser } from '@app/auth/state/auth.actions';


@Component({
  selector: 'app-core-footer',
  template: '<div>Mocked app-core-footer</div>',
})
export class AppCoreFooter {}

@Component({
  selector: 'app-core-topnav',
  template: '<div>Mocked app-core-topnav</div>',
})
export class AppCoreTopnav {}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

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
    user: { id: 1, email: 'mock@localhost.io'},
    loginStatus: config.status.COMPLETED,
    loginError: null,
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        AppCoreTopnav,
        AppCoreFooter,
      ],
      providers: [
        { provide: AuthApiService, useValue: AuthApiServiceMock },
        provideMockStore({ initialState: { auth: initialState } }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  describe('Load logged user: ', () => {

    it('should dispatch loadLoggedUser action', () => {
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(loadLoggedUser());
    });
  });
});
