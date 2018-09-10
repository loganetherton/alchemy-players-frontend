import { LOGIN, RESET_LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, CHANGE_PASSWORD, CHANGE_EMAIL} from '../constants';

import { login, resetLogin, loginFailed, loginSuccess, changeEmail, changePassword } from '../actions';

describe('Login Actions', () => {
  describe('changeEmail', () => {
    it('should allow the user to change the email input', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_EMAIL,
        email: fixture,
      };

      expect(changeEmail(fixture)).toEqual(expectedResult);
    });
  });
});
