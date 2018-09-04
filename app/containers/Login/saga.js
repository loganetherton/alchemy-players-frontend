/**
 * Handle login API requests
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import {
  loginSuccess,
  loginFailed
} from './actions';

import request from 'utils/request';
import { makeSelectLogin } from './selectors';

/**
 * Handle login
 */
export function* doLogin() {
  // // Select username from store
  const user = yield select(makeSelectLogin());
  const options = {method: 'POST', body: user};
  const requestURL = 'https://players-api.developer.alchemy.codes/api/login';

  try {
    const response = yield call(request, requestURL, options);
    yield put(loginSuccess(response));
  } catch (err) {
    console.log('**************ERR**********');
    console.log(err);
    yield put(loginFailed(err));
  }
}

/**
 * Watch for LOGIN to be dispatched and then login
 */
export default function* login() {
  yield takeLatest(LOGIN, doLogin);
}
