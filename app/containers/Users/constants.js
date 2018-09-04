/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_FIRST_NAME = 'playerApp/Login/CHANGE_FIRST_NAME';
export const CHANGE_LAST_NAME = 'playerApp/Login/CHANGE_LAST_NAME';
export const CHANGE_EMAIL = 'playerApp/Login/CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'playerApp/Login/CHANGE_PASSWORD';
export const CHANGE_CONFIRM_PASSWORD = 'playerApp/Login/CHANGE_CONFIRM_PASSWORD';
export const CREATE_USER = 'playerApp/Login/CREATE_USER';
export const USER_CREATED = 'playerApp/Login/USER_CREATED';
export const USER_CREATION_FAILED = 'playerApp/Login/USER_CREATION_FAILED';
export const RESET_USER_CREATION = 'playerApp/Login/RESET_USER_CREATION';
