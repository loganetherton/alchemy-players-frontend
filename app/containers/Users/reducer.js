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
  userCreationError: null
};

// The initial state of the App
export const initialState = fromJS(initialStateParams);

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIRST_NAME:
      return state.set('first_name', action.firstName.trim());
    case CHANGE_LAST_NAME:
      return state.set('last_name', action.lastName.trim());
    case CHANGE_EMAIL:
      return state.set('email', action.email.trim());
    case CHANGE_PASSWORD:
      return state.set('password', action.password.trim());
    case CHANGE_CONFIRM_PASSWORD:
      return state.set('confirm_password', action.confirmPassword.trim());
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
