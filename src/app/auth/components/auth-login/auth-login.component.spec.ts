import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLoginComponent } from './auth-login.component';
import { provideHttpClient } from '@angular/common/http';
import { CoreApiService } from '@/core/services/core-api.service';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let coreApiService: CoreApiService;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthLoginComponent
      ],
      providers: [
        provideHttpClient(),
        CoreApiService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    coreApiService = TestBed.inject(CoreApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Initial State', () => {

    it('should set initial controls values', () => {
      expect(component.email.value).toEqual('');
      expect(component.password.value).toEqual('');
    });

    it('should set show/hide values', () => {
      expect(component.showHidePasswordType).toEqual(component.SHOW_HIDE_PASSWORD_TYPE);
      expect(component.showHidePasswordText).toEqual(component.SHOW_HIDE_SHOW_TEXT);
    });
  });


  describe('Email Control', () => {

    it('should be required', () => {
      component.email.setValue('');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(false);
      component.email.setValue('abc@mock.io');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(true);
    });

    it('should be valid email', () => {
      component.email.setValue('abc');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(false);
      component.email.setValue('abc@mock.io');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(true);
    });
  });


  describe('Password Control', () => {

    it('should be required', () => {
      component.password.setValue('');
      fixture.detectChanges();
      expect(component.password.valid).toEqual(false);
      component.password.setValue('abc123');
      fixture.detectChanges();
      expect(component.password.valid).toEqual(true);
    });

    it('should meet min lenght', () => {
      component.password.setValue('abc');
      fixture.detectChanges();
      expect(component.password.valid).toEqual(false);
      component.password.setValue('abc123');
      fixture.detectChanges();
      expect(component.password.valid).toEqual(true);
    });
  });


  describe('Form Validation', () => {

    it('should validate controls', () => {
      component.email.setValue('');
      component.password.setValue('');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(false);
      expect(component.password.valid).toEqual(false);
      expect(component.form.valid).toEqual(false);
      component.email.setValue('abc@mock.io');
      component.password.setValue('abc123');
      fixture.detectChanges();
      expect(component.email.valid).toEqual(true);
      expect(component.password.valid).toEqual(true);
      expect(component.form.valid).toEqual(true);
    })
  });


  describe('onShowHide()', () => {

    it('should update values', () => {
      expect(component.showHidePasswordType).toEqual(component.SHOW_HIDE_PASSWORD_TYPE);
      expect(component.showHidePasswordText).toEqual(component.SHOW_HIDE_SHOW_TEXT);
      component.onShowHide();
      expect(component.showHidePasswordType).toEqual(component.SHOW_HIDE_TEXT_TYPE);
      expect(component.showHidePasswordText).toEqual(component.SHOW_HIDE_HIDE_TEXT);
      component.onShowHide();
      expect(component.showHidePasswordType).toEqual(component.SHOW_HIDE_PASSWORD_TYPE);
      expect(component.showHidePasswordText).toEqual(component.SHOW_HIDE_SHOW_TEXT);
    });
  });


  describe('onFormSubmit()', () => {
    
    it('should do nothing if form is invalid', () => {
      const spy = spyOn(coreApiService, 'post');
      spy.and.callThrough();
      component.email.setValue('');
      component.password.setValue('');
      expect(component.form.valid).toEqual(false);
      component.onFormSubmit();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should send request if form is valid', () => {
      const spy = spyOn(coreApiService, 'post');
      spy.and.callThrough();
      component.email.setValue('abc@mock.io');
      component.password.setValue('abc123');
      expect(component.form.valid).toEqual(true);
      component.onFormSubmit();
      expect(spy).toHaveBeenCalledOnceWith(
        component.AUTH_LOGIN_URL,
        { email: component.email.value, password: component.password.value }
      )
    });
  });

});
