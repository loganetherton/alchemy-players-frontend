/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILED, RESET_LOGIN, LOGIN} from '../constants';
import {
  changeEmail,
  changePassword,
  loginSuccess,
} from '../actions';

import login, {doLogin} from '../saga';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('Login Saga', () => {
  let loginGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    loginGenerator = doLogin();

    const selectDescriptor = loginGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = loginGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjhkZDBhMTMxMGQyMTdmZjM5MDE4ODQiLCJpYXQiOjE1MzY2MDU5Mjh9.oZEfwR29UnQwPEgWH1b3Phr30VHROWAZs8RQteLnY_A","user":{"first_name":"blahblah12","last_name":"blahblah12","email":"blahblah12@blahblah12.com","id":"5b8dd0a1310d217ff3901884"}};
    const putDescriptor = loginGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loginSuccess(response)));
  });
});
