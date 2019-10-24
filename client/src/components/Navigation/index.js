import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

import { Flex, Width } from '../Universal/style';
import { Ul, MenuItem } from './style';

const Navigation = ({ session }) => (
  <Fragment>
    {session && session.me && session.me.confirmed ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </Fragment>
);

const NavigationAuth = ({ session }) => (
  <Flex between back>
    <Ul>
      <NavLink
        activeClassName="active"
        style={{ textDecoration: 'none' }}
        to={routes.LANDING}
      >
        <li>
          <MenuItem>
            <FontAwesomeIcon icon={faPlay} />
            <Width full>Register</Width>
          </MenuItem>
        </li>
      </NavLink>
    </Ul>
    <SignOutButton />
  </Flex>
);

const NavigationNonAuth = () => (
  <Ul>
    <li>
      <Link style={{ textDecoration: 'none' }} to={routes.SIGN_IN}>
        <MenuItem>Sign In</MenuItem>
      </Link>
    </li>
    <li>
      <Link style={{ textDecoration: 'none' }} to={routes.SIGN_UP}>
        <MenuItem>Sign Up</MenuItem>
      </Link>
    </li>
  </Ul>
);

export default Navigation;
