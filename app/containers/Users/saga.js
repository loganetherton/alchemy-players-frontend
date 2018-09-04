/**
 * Create the user
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_USER } from './constants';
import {
  userCreated,
  userCreationError,
} from './actions';

import request from 'utils/request';
import { makeSelectUser } from './selectors';

/**
 * Github repos request/response handler
 */
export function* doCreateUser() {
  // // Select username from store
  const user = yield select(makeSelectUser());
  const options = {method: 'POST', body: user};
  const requestURL = 'https://players-api.developer.alchemy.codes/api/user';

  try {
    const response = yield call(request, requestURL, options);
    yield put(userCreated(response));
  } catch (err) {
    yield put(userCreationError(err.response));
  }
}

/**
 * Watch for user creation
 */
export default function* createUser() {
  yield takeLatest(CREATE_USER, doCreateUser);
}
