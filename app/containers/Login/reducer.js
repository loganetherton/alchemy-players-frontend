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
  loginError: null
};

// The initial state of the App
export const initialState = fromJS(initialStateParams);

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.email.trim());
    case CHANGE_PASSWORD:
      return state.set('password', action.password.trim());
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.response.token);
      localStorage.setItem('userId', action.response.user.id);
      return state.set('loginSuccess', true);
    case LOGIN_FAILED:
      return state;
    case RESET_LOGIN:
      return state.merge(initialStateParams);
    default:
      return state;
  }
}

export default homeReducer;
