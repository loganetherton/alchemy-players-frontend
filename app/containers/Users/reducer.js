/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  USER_CREATED,
  USER_CREATION_FAILED,
  RESET_USER_CREATION,
} from './constants';

const initialStateParams = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  userCreated: false,
  userCreationError: null,
  inputErrors: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  }
};

// The initial state of the App
export const initialState = fromJS(initialStateParams);

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return state.set('first_name', action.firstName.trim());
    case CHANGE_LAST_NAME:
      return state.set('last_name', action.lastName.trim());
    case CHANGE_EMAIL:
      const validEmail = emailRegex.test(action.email);
      return state.set('email', action.email.trim())
      .setIn(['inputErrors', 'email'], validEmail ? '' : 'Invalid email');
    case CHANGE_PASSWORD:
      return state.set('password', action.password.trim());
    case CHANGE_CONFIRM_PASSWORD:
      const invalidConfirm = state.get('password') !== action.confirmPassword;
      return state.set('confirm_password', action.confirmPassword.trim())
      .setIn(['inputErrors', 'confirm_password'], invalidConfirm ? 'Passwords do not match' : '');
    case USER_CREATED:
      localStorage.setItem('token', action.response.token);
      localStorage.setItem('userId', action.response.user.id);
      return state.set('userCreated', true);
    case USER_CREATION_FAILED:
      return state.set('userCreationError', action.error.statusText);
    case RESET_USER_CREATION:
      return state.merge(initialStateParams);
    default:
      return state;
  }
}

export default homeReducer;
