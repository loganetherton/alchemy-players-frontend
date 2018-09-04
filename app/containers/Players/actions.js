import {
  GET_PLAYERS,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILURE,
  CREATE_PLAYER,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAILURE,
  DELETE_PLAYER,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  RESET_PLAYER_FORM,
  CHANGE_HANDEDNESS,
  CHANGE_RATING,
} from './constants';

/**
 * Get the current players
 * @returns {{type: string}}
 */
export function getPlayers() {
  return {
    type: GET_PLAYERS
  };
}

/**
 * Successfully retrieved current players
 * @param response
 * @returns {{type: string, players: *}}
 */
export function getPlayersSuccess(response) {
  return {
    type: GET_PLAYERS_SUCCESS,
    response: response
  };
}

/**
 * Failed to retrieve players
 * @param err
 * @returns {{type: string, error: *}}
 */
export function getPlayersFailure(err) {
  return {
    type: GET_PLAYERS_FAILURE,
    error: err
  };
}

/**
 * Change the first name of the new player
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
 * Change the last name of the new player
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
 * Change the rating of the new player
 * @param rating Player rating
 * @returns {{type: string, rating: *}}
 */
export function changeRating(rating) {
  return {
    type: CHANGE_RATING,
    rating,
  };
}

/**
 * Change the handedness of the new player
 * @param handedness Handedness
 * @returns {{type: string, handedness: *}}
 */
export function changeHandedness(handedness) {
  return {
    type: CHANGE_HANDEDNESS,
    handedness,
  };
}

/**
 * Create new player
 * @returns {{type: string}}
 */
export function createPlayer() {
  return {
    type: CREATE_PLAYER
  };
}

/**
 * Successfully created new player
 * @param response
 * @returns {{type: string, player: *}}
 */
export function createPlayerSuccess(response) {
  return {
    type: CREATE_PLAYER_SUCCESS,
    player: response
  };
}

/**
 * Failed to create new player
 * @param err
 * @returns {{type: string, error: *}}
 */
export function createPlayerFailure(err) {
  return {
    type: CREATE_PLAYER_FAILURE,
    error: err
  };
}

/**
 * Delete player
 * @param id
 * @returns {{type: string, id: *}}
 */
export function deletePlayer(id) {
  return {
    type: DELETE_PLAYER,
    id
  };
}

/**
 * Successfully deleted player
 * @param response
 * @returns {{type: string, player: *}}
 */
export function deletePlayerSuccess(response) {
  return {
    type: DELETE_PLAYER_SUCCESS,
    player: response
  };
}

/**
 * Failed to delete player
 * @param err
 * @returns {{type: string, error: *}}
 */
export function deletePlayerFailure(err) {
  return {
    type: DELETE_PLAYER_FAILURE,
    error: err
  };
}

/**
 * Reset the new player form
 * @returns {{type: string}}
 */
export function resetNewPlayerForm() {
  return {
    type: RESET_PLAYER_FORM
  };
}
