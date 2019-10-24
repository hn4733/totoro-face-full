import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';
import { signOut } from './components/SignOut';

/************** HttpLink **************/
const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql',
});

/************** wsLink **************/
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`,
  options: {
    reconnect: true,
  },
});

/************** terminatingLink **************/
const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

/************** authLink **************/
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

/************** errorLink **************/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(
      ({ message, locations, path, extensions }) => {
        // console.log('GraphQL error', message);

        if (
          extensions &&
          extensions.code === 'UNAUTHENTICATED' &&
          message ===
            'Context creation failed: Your session expired. Sign in again.'
        ) {
          signOut(client);
        }
      },
    );
  }

  if (networkError) {
    // console.log('Network error', networkError);

    if (networkError.statusCode >= 401) {
      signOut(client);
    }
  }
});

/************** link **************/
const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

/************** app with client **************/
const AppWithClient = withApollo(App);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppWithClient />
  </ApolloProvider>,
  document.getElementById('root'),
);
