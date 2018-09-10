import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESET_LOGIN
} from './constants';

/**
 * Change email value
 * @param email
 * @returns {{type: string, email: *}}
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email
  };
}

/**
 * Change password value
 * @param password
 * @returns {{type: string, password: *}}
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}

/**
 * Initiate login
 * @returns {{type: string}}
 */
export function login() {
  return {
    type: LOGIN
  };
}

/**
 * Login success
 * @param response
 * @returns {{type: string, response: *}}
 */
export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    response
  };
}

/**
 * Login failed
 * @param err Error from API
 * @returns {{type: string, error: *}}
 */
export function loginFailed(err) {
  return {
    type: LOGIN_FAILED,
    error: err
  };
}

/**
 * Reset login form and state
 * @returns {{type: string}}
 */
export function resetLogin() {
  return {
    type: RESET_LOGIN
  };
}
