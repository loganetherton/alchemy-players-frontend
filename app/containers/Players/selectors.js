/**
 * Players selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPlayers = state => state.get('players', initialState);
const selectNewPlayer = state => state.getIn(['players', 'newPlayer'], initialState);
const selectPlayerId = state => state.getIn(['players', 'id'], initialState);

const makeSelectPlayers = () =>
  createSelector(selectPlayers, playerState => playerState.toJS());

const makeSelectNewPlayer = () =>
  createSelector(selectNewPlayer, newPlayerState => newPlayerState.toJS());

const makeSelectPlayerId = () =>
  createSelector(selectPlayerId, playerId => playerId);

export { selectPlayers, makeSelectPlayers, makeSelectNewPlayer, makeSelectPlayerId };
