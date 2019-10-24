import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';

const UPDATE_TOKEN = gql`
  mutation($token: String!) {
    updateToken(token: $token) {
      token
    }
  }
`;

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null;
      }

      const currentToken = localStorage.getItem('token');
      if (conditionFn(data)) {
        return (
          <Mutation
            mutation={UPDATE_TOKEN}
            variables={{ token: currentToken }}
          >
            {(updateToken, { data, loading, error }) => (
              <CheckToken
                updateToken={updateToken}
                loading={loading}
                error={error}
              >
                <Component {...props} />
              </CheckToken>
            )}
          </Mutation>
        );
      } else {
        return <Redirect to={routes.SIGN_IN} />;
      }
    }}
  </Query>
);

class CheckToken extends Component {
  componentDidMount() {
    this.props.updateToken().then(async ({ data }) => {
      localStorage.setItem('token', data.updateToken.token);
    });
  }

  render() {
    return this.props.children;
  }
}

export default withAuthorization;
