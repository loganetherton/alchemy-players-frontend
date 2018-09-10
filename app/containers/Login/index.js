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

const errorStyle = {color: 'red'};
const enterKey = 13;

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.PureComponent {
  // Remove page data
  componentDidMount() {
    this.props.onResetPage();

    this.submitOnEnter = this.submitOnEnter.bind(this);

    this.inputError = this.inputError.bind(this);
  }

  // Remove data when leaving the page
  componentWillUnmount() {
    this.props.onResetPage();
  }

  /**
   * Handle login errors
   * @returns {*}
   */
  loginError() {
    const loginError = this.props.login.loginError;
    if (loginError) {
      return <span style={errorStyle}>Login Failed: {loginError}</span>;
    }
    return <span/>;
  }

  /**
   * Display input validation errors
   * @param type
   * @returns {*}
   */
  inputError(type) {
    const errors = this.props.login.inputErrors;
    if (errors[type]) {
      return <span style={errorStyle}>{errors[type]}</span>;
    }
    return <span/>;
  }

  /**
   * Disable login until validation passes
   * @returns {boolean}
   */
  loginDisabled() {
    const inputErrors = this.props.login.inputErrors;
    return !!(inputErrors.email || inputErrors.password);
  }

  /**
   * Submit on enter
   * @param e
   */
  submitOnEnter(e) {
    if (e.which === enterKey) {
      this.props.onSubmitForm();
    }
  }

  /**
   * Create an input for the form
   * @param {Object} attrs
   * @param {String} attrs.id
   * @param {String} attrs.type
   * @param {String} attrs.placeholder
   * @param {String} attrs.value
   * @param {*} attrs.onChange
   * @returns {*}
   */
  createInput(attrs) {
    const {id, type = 'text', placeholder, value, onChange} = attrs;
    return (
      <p>
        <label htmlFor={id}>
          {attrs.placeholder} &nbsp;
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={this.submitOnEnter}
          />
        </label>
        {this.inputError(id)}
      </p>
    );
  }

  render() {
    const { email, password, login, onChangeEmail, onChangePassword, onSubmitForm } = this.props;

    let component = '';

    // Redirect after user created
    if (login.loginSuccess) {
      component = <Redirect to='/roster' />;
    } else {
      // For logout
      if (window && window.localStorage && window.localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
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
                {this.createInput({
                  id: 'email',
                  placeholder: 'Email',
                  value: email,
                  onChange: onChangeEmail,
                })}
                {this.createInput({
                  id: 'password',
                  placeholder: 'Password',
                  value: password,
                  onChange: onChangePassword
                })}
                <Button onClick={onSubmitForm} disabled={this.loginDisabled()} id="login">Login</Button>
                {this.loginError()}
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
