import { Component } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatTopnavComponent } from './mat-topnav.component';
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
class AuthLoginComponent {}

@Component({
  selector: 'app-core-landing',
  standalone: true,
  template: '',
})
class AuthProfileComponent {}


describe('MatTopnavComponent', () => {
  let component: MatTopnavComponent;
  let fixture: ComponentFixture<MatTopnavComponent>;
  let store: MockStore;
  let router: Router;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTopnavComponent
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

    fixture = TestBed.createComponent(MatTopnavComponent);
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
});
