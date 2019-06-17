import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

  <header class="w3-container w3-xlarge w3-padding-24">
    <a class="w3-left w3-button w3-white"><Link to={ROUTES.LANDING}>Home</Link></a>
    <a class="w3-left w3-button w3-white"><Link to={ROUTES.HOME}>Your Todos</Link></a>
    <a class="w3-right w3-button w3-white"><Link to={ROUTES.ACCOUNT}>Account</Link></a>
    
    {!!authUser.roles[ROLES.ADMIN] && (
      <a class="w3-right w3-button w3-white"><Link to={ROUTES.ADMIN}>Admin</Link></a>
    )}

    <a class="w3-right w3-button w3-white"><SignOutButton /></a>

  </header>

);

const NavigationNonAuth = () => (
  <header class="w3-container w3-xlarge w3-padding-24">
    <a class="w3-left w3-button w3-white"><Link to={ROUTES.LANDING}>Home</Link></a>
    <a class="w3-right w3-button w3-white"><Link to={ROUTES.SIGN_IN}>Sign In</Link></a>
  </header>
);

export default Navigation;
