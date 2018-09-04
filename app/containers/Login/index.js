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
  login,
  resetLogin,
} from './actions';
import {
  changeEmail,
  changePassword,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLogin } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.PureComponent {
  // Remove page data
  componentDidMount() {
    this.props.onResetPage();
  }

  // Remove data when leaving the page
  componentWillUnmount() {
    this.props.onResetPage();
  }

  render() {
    const { email, password, login, onChangeEmail, onChangePassword, onSubmitForm } = this.props;

    let component = '';

    // Redirect after user created
    if (login.loginSuccess) {
      component = <Redirect to='/players' />;
    } else {
      component = (
        <article>
          <div>
            <CenteredSection>
              <H2>
                Login
              </H2>
            </CenteredSection>
            <Section>
              <H2>
                Login
              </H2>
              <Form>
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
                <Button onClick={onSubmitForm}>Login</Button>
              </Form>
            </Section>
          </div>
        </article>
      );
    }

    return component;
  }
}

Login.propTypes = {
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
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(login());
    },
    onResetPage: () => dispatch(resetLogin())
  };
}

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
