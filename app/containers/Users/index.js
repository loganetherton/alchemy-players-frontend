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

  render() {
    const { onSubmitForm, onChangeFirstName, onChangeLastName, onChangeEmail, onChangePassword, onChangeConfirmPassword, firstName, lastName, email, password, confirmPassword, user } = this.props;

    let component = '';

    // Redirect after user created
    if (user.userCreated) {
      component = <Redirect to='/login' />;
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
                </p>
                <Button onClick={onSubmitForm}>Create User</Button>
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
