import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_CONFIRM_PASSWORD,
  CREATE_USER,
  USER_CREATED,
  USER_CREATION_FAILED,
  RESET_USER_CREATION,
} from './constants';

/**
 * Change the first name of the new user
 * @param firstName First name
 * @returns {{type: string, firstName: *}}
 */
export function changeFirstName(firstName) {
  return {
    type: CHANGE_FIRST_NAME,
    firstName,
  };
}

/**
 * Change the last name of the new user
 * @param lastName Last name
 * @returns {{type: string, lastName: *}}
 */
export function changeLastName(lastName) {
  return {
    type: CHANGE_LAST_NAME,
    lastName,
  };
}

/**
 * Change email of new user
 * @param email Email
 * @returns {{type: string, email: *}}
 */
export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

/**
 * Change password of new user
 * @param password Password
 * @returns {{type: string, password: *}}
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

/**
 * Change confirm password of new user
 * @param confirmPassword Confirm password
 * @returns {{type: string, confirmPassword: *}}
 */
export function changeConfirmPassword(confirmPassword) {
  return {
    type: CHANGE_CONFIRM_PASSWORD,
    confirmPassword,
  };
}

/**
 * Create a new user
 * @returns {{type: string}}
 */
export function createUser() {
  return {
    type: CREATE_USER
  };
}

/**
 * User has been successfully created
 * @param response API response
 * @returns {{type: string, response: *}}
 */
export function userCreated(response) {
  return {
    type: USER_CREATED,
    response
  };
}

/**
 * Failed to create user
 * @param error
 * @returns {{type: string, error: *}}
 */
export function userCreationError(error) {
  return {
    type: USER_CREATION_FAILED,
    error: error,
  };
}

/**
 * Reset the user creation form and page on load
 * @returns {{type: string}}
 */
export function resetCreateUser() {
  return {
    type: RESET_USER_CREATION
  };
}


