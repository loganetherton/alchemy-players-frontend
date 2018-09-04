/*
 * User creation page
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {Redirect} from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import H1 from 'components/H1';
import Button from 'components/Button';
import PlayersTable from 'components/PlayersTable';
import Toggle from 'components/Toggle';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import {
  changeFirstName,
  changeHandedness,
  changeLastName,
  changeRating,
  getPlayers,
  createPlayer,
  deletePlayer,
  resetNewPlayerForm
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPlayers } from './selectors';

// Options for selecting handedness
const handednessOptions = [
  'left',
  'right'
];

// Display messages for handedness options
const handednessMessages = {
  left: 'Left',
  right: 'Right'
};

const errorStyle = {color: 'red'};

/* eslint-disable react/prefer-stateless-function */
export class Players extends React.PureComponent {
  // // Remove page data
  componentDidMount() {
    this.props.onGetPlayers();
    this.props.onResetPage();
  }

  // Remove data when leaving the page
  componentWillUnmount() {
    this.props.onResetPage();
  }

  /**
   * Generic error extend API errors
   * @param type
   * @returns {*}
   */
  genericError(type) {
    const errors = this.props.players.errors;
    if (errors[type]) {
      return <span style={errorStyle}>Failed to {type}: {errors[type]}</span>;
    }
    return <span/>;
  }

  /**
   * Input validation error
   * @param type
   * @returns {*}
   */
  inputError(type) {
    const errors = this.props.players.inputErrors;
    if (errors[type]) {
      return <span style={errorStyle}>{errors[type]}</span>;
    }
    return <span/>;
  }

  /**
   * Disable submit until validation passes
   * @returns {boolean}
   */
  disableSubmit() {
    const errors = this.props.players.inputErrors;
    return !!(errors.first_name || errors.last_name || errors.rating);
  }

  /**
   * Failed to create player
   * @returns {*}
   */
  createPlayerError() {
    return this.genericError('create');
  }

  /**
   * Failed to retrieve players
   * @returns {*}
   */
  getPlayersError() {
    return this.genericError('get');
  }

  /**
   * Failed to delete players
   * @returns {*}
   */
  deletePlayerError() {
    return this.genericError('delete');
  }

  render() {
    const { players, onChangeFirstName, onChangeLastName, onChangeRating,
            onChangeHandedness, onSubmitForm } = this.props;

    let component = '';

    const newPlayer = players.newPlayer;

    console.log('**************PLAYER**********');
    console.log(players);
    console.log(newPlayer.first_name);
    console.log(newPlayer.last_name);
    console.log(newPlayer.rating);

    // Redirect after user created
    if (!localStorage.getItem('token')) {
      component = <Redirect to='/' />;
    } else {
      component = (
        <article>
          <div>
            <CenteredSection>
              <H1>
                Players
              </H1>
            </CenteredSection>
            <Section>
              <H2>
                Create New Player
              </H2>
              <Form>
                <p>
                  <label htmlFor="first_name">
                    First Name &nbsp;
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      value={newPlayer.first_name}
                      onChange={onChangeFirstName}
                    />
                  </label>
                </p>
                <p>
                  <label htmlFor="last_name">
                    Last Name &nbsp;
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      value={newPlayer.last_name}
                      onChange={onChangeLastName}
                    />
                  </label>
                </p>
                <p>
                  <label htmlFor="rating">
                    Rating &nbsp;
                    <Input
                      id="rating"
                      type="text"
                      placeholder="Rating"
                      value={newPlayer.rating}
                      onChange={onChangeRating}
                    />
                  </label>
                  {this.inputError('rating')}
                </p>
                <p>
                  <label htmlFor="handedness">
                    Handedness &nbsp;
                    <Toggle
                      onToggle={onChangeHandedness}
                      values={handednessOptions}
                      messages={handednessMessages}
                      value={newPlayer.handedness}
                    />
                  </label>
                </p>
                <Button onClick={onSubmitForm} disabled={this.disableSubmit()}>Create Player</Button>
                {this.createPlayerError()}
              </Form>
            </Section>
            <CenteredSection>
              <H1>Current Players</H1>
            </CenteredSection>
            <Section>
              {this.getPlayersError()}
              {this.deletePlayerError()}
              <PlayersTable
                players={players.players}
                onClick={this.props.onDeletePlayer}
              />
            </Section>
          </div>
        </article>
      );
    }

    return component;
  }
}

Players.propTypes = {
  onSubmitForm: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangeRating: PropTypes.func,
  onChangeHandedness: PropTypes.func,
  onGetPlayers: PropTypes.func,
  onDeletePlayer: PropTypes.func,
  onResetPage: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFirstName: evt => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: evt => dispatch(changeLastName(evt.target.value)),
    onChangeRating: evt => dispatch(changeRating(evt.target.value)),
    onChangeHandedness: evt => dispatch(changeHandedness(evt.target.value)),
    onGetPlayers: () => dispatch(getPlayers()),
    onDeletePlayer: id => dispatch(deletePlayer(id)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createPlayer());
    },
    onResetPage: () => dispatch(resetNewPlayerForm())
  };
}

const mapStateToProps = createStructuredSelector({
  players: makeSelectPlayers()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'players', reducer });
const withSaga = injectSaga({ key: 'players', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Players);
