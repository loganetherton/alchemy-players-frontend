import { fromJS } from 'immutable';

import loginReducer from '../reducer';
import {
  changeEmail,
  changeUsername,
} from '../actions';
import {
  CHANGE_EMAIL,
  LOGIN_FAILED,
} from '../constants';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    const inputErrors = fromJS({"email": "", "password": ""});
    state = fromJS({"email": "", "password": "", "loginSuccess": false, "loginError": null, "inputErrors": inputErrors});
  });

  it('should handle CHANGE_EMAIL', () => {
    const email = 'email@email.com';
    const startAction = {
      type: CHANGE_EMAIL,
      email
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(loginReducer(state, startAction)).toEqual(state.set('email', email).setIn(['inputErrors', 'email'], ''));
  });

  it('should handle LOGIN_FAILED', () => {
    const failError = 'Nope';
    const startAction = {
      type: LOGIN_FAILED,
      error: {
        statusText: failError
      }
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(loginReducer(state, startAction)).toEqual(state.set('loginError', failError));
  });
});
