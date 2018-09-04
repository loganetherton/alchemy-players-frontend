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
   * Generic error others extend
   * @param type
   * @returns {*}
   */
  genericError(type) {
    const errors = this.props.players.errors;
    if (errors[type]) {
      return <p>Failed to {type}: {errors[type]}</p>;
    }
    return <span/>;
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
    const { firstName, lastName, rating, players, onChangeFirstName, onChangeLastName, onChangeRating,
            onChangeHandedness, onSubmitForm } = this.props;

    let component = '';

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
                      value={firstName}
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
                      value={lastName}
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
                      value={rating}
                      onChange={onChangeRating}
                    />
                  </label>
                </p>
                <p>
                  <label htmlFor="handedness">
                    Handedness &nbsp;
                    <Toggle
                      onToggle={onChangeHandedness}
                      values={handednessOptions}
                      messages={handednessMessages}
                    />
                  </label>
                </p>
                <Button onClick={onSubmitForm}>Create Player</Button>
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
