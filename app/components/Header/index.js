import React from 'react';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Players API Frontend</h1>
        <NavBar>
          <HeaderLink to="/">
            Login
          </HeaderLink>
          <HeaderLink to="/users">
            Users
          </HeaderLink>
          <HeaderLink to="/players">
            Players
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
