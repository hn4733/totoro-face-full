import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';

const isLoggedIn = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null;
      }

      return conditionFn(data) ? (
        <Redirect to={routes.LANDING} />
      ) : (
        <Component {...props} />
      );
    }}
  </Query>
);

export default isLoggedIn;
