/**
 * Login selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.get('login', initialState);

const makeSelectLogin = () =>
  createSelector(selectLogin, loginState => loginState.toJS());

export { selectLogin, makeSelectLogin };
