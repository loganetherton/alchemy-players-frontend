import { fromJS } from 'immutable';

import { makeSelectLogin, selectLogin } from '../selectors';

describe('selectLogin', () => {
  const initialState = {
    email: '',
    password: '',
    loginSuccess: false,
    loginError: null,
    inputErrors: {
      email: '',
      password: ''
    }
  };
  const initState = fromJS(initialState);
  it('should select the login state', () => {
    const loginState = initialState;
    const mockedState = fromJS({
      login: loginState,
    });
    expect(selectLogin(mockedState)).toEqual(initState);
  });
});
