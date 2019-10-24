import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

import { Button } from '../Universal/style';

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <Button
        height={'40px'}
        normal
        noMargin
        type="button"
        onClick={() => signOut(client)}
      >
        Sign Out
      </Button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push(routes.SIGN_IN);
};

export { signOut };

export default SignOutButton;
