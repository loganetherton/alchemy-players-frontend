import { fromJS } from 'immutable';

import {
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAILURE,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
  RESET_PLAYER_FORM,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_RATING,
  CHANGE_HANDEDNESS,
  DELETE_PLAYER,
} from './constants';

const newPlayerForm = {
  first_name: '',
  last_name: '',
  rating: '',
  handedness: 'left'
};

const initialStateParams = {
  players: [],
  newPlayer: newPlayerForm,
  id: null,
  errors: {
    get: null,
    create: null,
    delete: null
  }
};

// The initial state of the App
export const initialState = fromJS(initialStateParams);

function homeReducer(state = initialState, action) {
  switch (action.type) {
    /**
     * New player attributes
     */
    case CHANGE_FIRST_NAME:
      return state.setIn(['newPlayer', 'first_name'], action.firstName);
    case CHANGE_LAST_NAME:
      return state.setIn(['newPlayer', 'last_name'], action.lastName);
    case CHANGE_RATING:
      return state.setIn(['newPlayer', 'rating'], action.rating);
    case CHANGE_HANDEDNESS:
      return state.setIn(['newPlayer', 'handedness'], action.handedness);
    /**
     * API responses
     */
    case GET_PLAYERS_SUCCESS:
      return state.set('players', fromJS(action.response.players));
    case GET_PLAYERS_FAILURE:
      return state.setIn(['errors', 'get'], action.error.statusText);
    case CREATE_PLAYER_SUCCESS:
      return state.set('newPlayer', fromJS(newPlayerForm));
    case CREATE_PLAYER_FAILURE:
      return state.setIn(['errors', 'create'], action.error.statusText);
    case DELETE_PLAYER:
      return state.set('id', action.id);
    case DELETE_PLAYER_SUCCESS:
      return state;
    case DELETE_PLAYER_FAILURE:
      return state.setIn(['errors', 'delete'], action.error.statusText);
    case RESET_PLAYER_FORM:
      return state.merge(initialStateParams);
    default:
      return state;
  }
}

export default homeReducer;
