import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Footer from '../Footer';
import { SignInForm } from '../SignIn';
import isLoggedIn from '../Session/isLoggedIn';

import * as routes from '../../constants/routes';
import Loading from '../Loading';
import { SignInFormWrapper, SignInWidth } from '../SignIn/style';
import { Green } from './style';
import {
  Notification,
  SignInWrapper,
  H1,
  Back,
} from '../Universal/style';

const CONFIRMATION_TOKEN = gql`
  mutation($token: String!) {
    confirmationToken(token: $token) {
      result
    }
  }
`;

const Confirmation = props => {
  const { token } = props.match.params;
  return (
    <Fragment>
      <Back>
        <SignInFormWrapper wrap="true">
          <H1 center width={'100%'}>
            Facial Detection App
          </H1>
          <SignInWidth>
            <h1>Confirmation</h1>
            <Mutation
              mutation={CONFIRMATION_TOKEN}
              variables={{ token }}
            >
              {(confirmationToken, { data, loading, error }) => (
                <StartMutationOnMount
                  confirmationToken={confirmationToken}
                >
                  {loading && <Loading />}
                  {error && (
                    <SignInWrapper>
                      <Notification>
                        Either the token has Expired or the url is
                        invalid. Please{' '}
                        <Link to={routes.SIGN_UP}>register</Link>{' '}
                        again.
                      </Notification>
                    </SignInWrapper>
                  )}
                  {data && (
                    <div>
                      <Notification>
                        Awesome, your email has been{' '}
                        <Green>verified!</Green> You can now login
                        below.
                      </Notification>
                      <SignInWrapper>
                        <SignInForm
                          history={props.history}
                          refetch={props.refetch}
                        />
                      </SignInWrapper>
                    </div>
                  )}
                </StartMutationOnMount>
              )}
            </Mutation>
          </SignInWidth>
        </SignInFormWrapper>
      </Back>
      <Footer />
    </Fragment>
  );
};

class StartMutationOnMount extends Component {
  componentDidMount() {
    this.props.confirmationToken();
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(
  isLoggedIn(session => session && session.me)(Confirmation),
);
