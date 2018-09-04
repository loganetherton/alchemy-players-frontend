/**
 * Handle player API requests
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_PLAYERS, CREATE_PLAYER, DELETE_PLAYER } from './constants';
import {
  getPlayersSuccess,
  getPlayersFailure,
  createPlayerSuccess,
  createPlayerFailure,
  deletePlayerSuccess,
  deletePlayerFailure
} from './actions';

import request from 'utils/request';
import {
  makeSelectNewPlayer,
  makeSelectPlayerId
} from './selectors';

const requestURL = 'https://players-api.developer.alchemy.codes/api/players';

/**
 * Handle retrieving players
 */
export function* doCreatePlayer() {
  const player = yield select(makeSelectNewPlayer());
  const options = {method: 'POST', body: player, headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}};

  try {
    const response = yield call(request, requestURL, options);
    yield put(createPlayerSuccess(response));
  } catch (err) {
    console.log('**************ERR**********');
    console.log(err);
    yield put(createPlayerFailure(err));
  }
}

/**
 * Retrieve players list
 * @returns {IterableIterator<*>}
 */
export function* doGetPlayers() {
  const options = {method: 'GET', headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}};

  try {
    const response = yield call(request, requestURL, options);
    yield put(getPlayersSuccess(response));
  } catch (err) {
    console.log('**************ERR**********');
    console.log(err);
    yield put(getPlayersFailure(err));
  }
}

/**
 * Delete a player
 * @returns {IterableIterator<*>}
 */
export function* doDeletePlayer() {
  const playerId = yield select(makeSelectPlayerId());
  console.log('**************PLAYER ID 2**********');
  console.log(playerId);
  const options = {method: 'DELETE', headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}};

  const url = requestURL + `/${playerId}`;

  try {
    const response = yield call(request, url, options);
    yield put(deletePlayerSuccess(response));
  } catch (err) {
    console.log('**************ERR**********');
    console.log(err);
    yield put(deletePlayerFailure(err));
  }
}

/**
 * Watch for player actions to init API calls
 */
export default function* player() {
  yield takeLatest(CREATE_PLAYER, doCreatePlayer);
  yield takeLatest(GET_PLAYERS, doGetPlayers);
  yield takeLatest(DELETE_PLAYER, doDeletePlayer);
}
