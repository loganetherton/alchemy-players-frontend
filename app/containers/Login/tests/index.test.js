/**
 * Test the LoginPage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import CenteredSection from '../CenteredSection';
import { Login, mapDispatchToProps } from '../index';
import { changeEmail } from '../actions';
import { loadRepos } from '../../App/actions';
import H2 from 'components/H2';

describe('<Login />', () => {
  it('should render a section to display the title', () => {
    const props = {
      login        : {
        loginSuccess: false,
        inputErrors : {
          email   : '',
          password: '',
        },
      },
      email        : 'blah@blah.com',
      password     : 'password',
      inputErrors  : {
        email   : '',
        password: '',
      },
      onChangeEmail: () => {
      },
      onChangePassword: () => {
      },
      onSubmitForm    : () => {
      },
      onResetPage: () => {}
    };
    const renderedComponent = shallow(
      <Login {...props}/>,
    );
    expect(
      renderedComponent.contains(
        <H2>
          Login
        </H2>,
      ),
    ).toEqual(true);
  });

  // it('should render fetch the repos on mount if a username exists', () => {
  //   const submitSpy = jest.fn();
  //   mount(
  //     <IntlProvider locale="en">
  //       <Login
  //         username="Not Empty"
  //         onChangeEmail={() => {}}
  //         onSubmitForm={submitSpy}
  //       />
  //     </IntlProvider>,
  //   );
  //   expect(submitSpy).toHaveBeenCalled();
  // });
  //
  // it('should not call onSubmitForm if username is an empty string', () => {
  //   const submitSpy = jest.fn();
  //   mount(
  //     <IntlProvider locale="en">
  //       <Login onChangeEmail={() => {}} onSubmitForm={submitSpy} />
  //     </IntlProvider>,
  //   );
  //   expect(submitSpy).not.toHaveBeenCalled();
  // });
  //
  // it('should not call onSubmitForm if username is null', () => {
  //   const submitSpy = jest.fn();
  //   mount(
  //     <IntlProvider locale="en">
  //       <Login
  //         username=""
  //         onChangeEmail={() => {}}
  //         onSubmitForm={submitSpy}
  //       />
  //     </IntlProvider>,
  //   );
  //   expect(submitSpy).not.toHaveBeenCalled();
  // });

  // describe('mapDispatchToProps', () => {
  //   describe('onChangeEmail', () => {
  //     it('should be injected', () => {
  //       const dispatch = jest.fn();
  //       const result = mapDispatchToProps(dispatch);
  //       expect(result.onChangeEmail).toBeDefined();
  //     });
  //
  //     it('should dispatch changeUsername when called', () => {
  //       const dispatch = jest.fn();
  //       const result = mapDispatchToProps(dispatch);
  //       const username = 'mxstbr';
  //       result.onChangeEmail({ target: { value: username } });
  //       expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
  //     });
  //   });
  //
  //   describe('onSubmitForm', () => {
  //     it('should be injected', () => {
  //       const dispatch = jest.fn();
  //       const result = mapDispatchToProps(dispatch);
  //       expect(result.onSubmitForm).toBeDefined();
  //     });
  //
  //     it('should dispatch loadRepos when called', () => {
  //       const dispatch = jest.fn();
  //       const result = mapDispatchToProps(dispatch);
  //       result.onSubmitForm();
  //       expect(dispatch).toHaveBeenCalledWith(loadRepos());
  //     });
  //
  //     it('should preventDefault if called with event', () => {
  //       const preventDefault = jest.fn();
  //       const result = mapDispatchToProps(() => {});
  //       const evt = { preventDefault };
  //       result.onSubmitForm(evt);
  //       expect(preventDefault).toHaveBeenCalledWith();
  //     });
  //   });
  // });
});
