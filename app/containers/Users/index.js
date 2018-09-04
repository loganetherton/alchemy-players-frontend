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
import Button from 'components/Button';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import {
  createUser,
  resetCreateUser,
} from './actions';
import {
  changeConfirmPassword,
  changeEmail,
  changeFirstName,
  changeLastName,
  changePassword,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUser } from './selectors';

const errorStyle = {color: 'red'};

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.PureComponent {
  // Remove user created on load so we can come back here
  componentDidMount() {
    this.props.onResetPage();
  }

  // Remove data when leaving the page
  componentWillUnmount() {
    this.props.onResetPage();
  }

  /**
   * Error creating user
   * @returns {*}
   */
  userCreateError() {
    const error = this.props.user.userCreationError;
    if (error) {
      return <p style={errorStyle}>Failed to create user: {error}</p>;
    }
    return <span/>;
  }

  /**
   * Input has error
   * @param type
   * @returns {*}
   */
  inputError(type) {
    const errors = this.props.user.inputErrors;
    if (errors[type]) {
      return <span style={errorStyle}>{errors[type]}</span>;
    }
    return <span/>;
  }

  /**
   * Disable creating user until input validation passes
   * @returns {boolean}
   */
  createDisabled() {
    const errors = this.props.user.inputErrors;
    return !!(errors.first_name || errors.last_name || errors.email || errors.password || errors.confirm_password);
  }

  render() {
    const { onSubmitForm, onChangeFirstName, onChangeLastName, onChangeEmail, onChangePassword, onChangeConfirmPassword, firstName, lastName, email, password, confirmPassword, user } = this.props;

    let component = '';

    // Redirect after user created
    if (user.userCreated) {
      component = <Redirect to='/' />;
    } else {
      component = (
        <article>
          <div>
            <CenteredSection>
              <H2>
                Create new user
              </H2>
              <p>
                Use the form below to create a new user to administer players
              </p>
            </CenteredSection>
            <Section>
              <H2>
                Create user
              </H2>
              <Form>
                <p>
                  <label htmlFor="firstName">
                    First name &nbsp;
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={onChangeFirstName}
                    />
                  </label>
                  {this.inputError('first_name')}
                </p>
                <p>
                  <label htmlFor="lastName">
                    Last name &nbsp;
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={onChangeLastName}
                    />
                  </label>
                  {this.inputError('last_name')}
                </p>
                <p>
                  <label htmlFor="email">
                    Email &nbsp;
                    <Input
                      id="email"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={onChangeEmail}
                    />
                  </label>
                  {this.inputError('email')}
                </p>
                <p>
                  <label htmlFor="password">
                    Password &nbsp;
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChangePassword}
                    />
                  </label>
                  {this.inputError('password')}
                </p>
                <p>
                  <label htmlFor="confirm_password">
                    Confirm password &nbsp;
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={onChangeConfirmPassword}
                    />
                  </label>
                  {this.inputError('confirm_password')}
                </p>
                <Button onClick={onSubmitForm} disabled={this.createDisabled()}>Create User</Button>
                {this.userCreateError()}
              </Form>
            </Section>
          </div>
        </article>
      );
    }

    return component;
  }
}

Users.propTypes = {
  onSubmitForm: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeConfirmPassword: PropTypes.func,
  onResetPage: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFirstName: evt => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: evt => dispatch(changeLastName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangeConfirmPassword: evt => dispatch(changeConfirmPassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(createUser());
    },
    onResetPage: () => dispatch(resetCreateUser())
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Users);
