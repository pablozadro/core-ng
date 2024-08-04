import * as fromReducer from './auth.reducer';
import * as actions from './auth.actions';
import {
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/core/config';


describe('authReducer', () => {

  describe('Unknown action', () => {

    it('should return default state', () => {
      const { initialAuthState } = fromReducer;
      const action = { type: 'Unknown' };
      const state =  fromReducer.authReducer(initialAuthState, action);
      expect(state).toBe(initialAuthState);
    });
  });


  describe('login', () => {

    it('should set state properly', () => {
      const { initialAuthState } = fromReducer;
      const newState: fromReducer.AuthState = {
        status: CORE_INPROGRESS_STATUS,
        error: '',
        token: '',
      }
      const action = actions.login({ email: 'abc@mock.io', password: '123'});
      const state = fromReducer.authReducer(initialAuthState, action);
      expect(state).toEqual(newState);
    });
  });


  describe('loginSuccess', () => {

    it('should set state properly', () => {
      const { initialAuthState } = fromReducer;
      const newState: fromReducer.AuthState = {
        status: CORE_DONE_STATUS,
        error: '',
        token: 'abc123',
      }
      const action = actions.loginSuccess({ token: 'abc123' });
      const state = fromReducer.authReducer(initialAuthState, action);
      expect(state).toEqual(newState);
    });
  });


  describe('loginError', () => {

    it('should set state properly', () => {
      const { initialAuthState } = fromReducer;
      const newState: fromReducer.AuthState = {
        status: CORE_DONE_STATUS,
        error: 'mock error',
        token: '',
      }
      const action = actions.loginError({ error: 'mock error' });
      const state = fromReducer.authReducer(initialAuthState, action);
      expect(state).toEqual(newState);
    });
  });

});