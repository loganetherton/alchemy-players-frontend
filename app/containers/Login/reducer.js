import { fromJS } from 'immutable';

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESET_LOGIN
} from './constants';

const initialStateParams = {
  email: '',
  password: '',
  loginSuccess: false,
  loginError: null,
  inputErrors: {
    email: '',
    password: ''
  }
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// The initial state of the App
export const initialState = fromJS(initialStateParams);

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      const email = action.email.trim();
      const validEmail = emailRegex.test(email);
      return state.set('email', action.email.trim()).setIn(['inputErrors', 'email'], validEmail ? '': 'Invalid email');
    case CHANGE_PASSWORD:
      return state.set('password', action.password.trim());
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.response.token);
      localStorage.setItem('userId', action.response.user.id);
      return state.set('loginSuccess', true).set('loginError', '');
    case LOGIN_FAILED:
      return state.set('loginError', action.error.statusText);
    case RESET_LOGIN:
      return state.merge(initialStateParams);
    default:
      return state;
  }
}

export default homeReducer;
