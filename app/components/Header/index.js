import React from 'react';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    const isLoggedIn = localStorage.getItem('token');
    return (
      <div>
        <h1>Players API Frontend</h1>
        <NavBar>
          <HeaderLink to="/login">
            {isLoggedIn ? 'Logout' : 'Login'}
          </HeaderLink>
          <HeaderLink to="/register">
            Register
          </HeaderLink>
          <HeaderLink to="/roster">
            Players
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
