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
const enterKey = 13;

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.PureComponent {
  // Remove user created on load so we can come back here
  componentDidMount() {
    this.props.onResetPage();

    this.submitOnEnter = this.submitOnEnter.bind(this);
  }

  // Remove data when leaving the page
  componentWillUnmount() {
    this.props.onResetPage();
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
    const { onSubmitForm, onChangeFirstName, onChangeLastName, onChangeEmail, onChangePassword, onChangeConfirmPassword, firstName, lastName, email, password, confirmPassword, user } = this.props;

    let component = '';

    // Redirect after user created
    if (user.userCreated) {
      component = <Redirect to='/roster' />;
    } else {
      component = (
        <article>
          <div>
            <CenteredSection>
              <H2>
                Register
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
                {this.createInput({
                  id: 'firstName',
                  placeholder: 'First Name',
                  value: firstName,
                  onChange: onChangeFirstName,
                })}
                {this.createInput({
                  id: 'lastName',
                  placeholder: 'Last Name',
                  value: lastName,
                  onChange: onChangeLastName,
                })}
                {this.createInput({
                  id: 'email',
                  placeholder: 'Email',
                  type: 'email',
                  value: email,
                  onChange: onChangeEmail,
                })}
                {this.createInput({
                  id: 'password',
                  type: 'password',
                  placeholder: 'Password',
                  value: password,
                  onChange: onChangePassword,
                })}
                {this.createInput({
                  id: 'confirmPassword',
                  placeholder: 'Confirm Password',
                  value: confirmPassword,
                  onChange: onChangeConfirmPassword,
                })}
                <Button id="register" onClick={onSubmitForm} disabled={this.createDisabled()}>Create User</Button>
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
