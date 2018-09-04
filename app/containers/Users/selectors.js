/**
 * Selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsers = state => state.get('users', initialState);

const makeSelectUser = () =>
  createSelector(selectUsers, userState => userState.toJS());

export { selectUsers, makeSelectUser };
