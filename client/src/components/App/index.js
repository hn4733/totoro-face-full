import React, { Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Confirmation from '../SignUp/confirmation';
import Forgot from '../Forgot';
import Reset from '../Forgot/Reset';
import withSession from '../Session/withSession';

import { GlobalStyle } from '../../theme/GlobalStyle';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

const App = ({ session, refetch, client }) => (
  <Router history={history}>
    <Fragment>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path={routes.LANDING}
          component={() => <LandingPage session={session} />}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          component={() => (
            <SignInPage refetch={refetch} client={client} />
          )}
        />
        <Route
          exact
          path={routes.SIGN_UP}
          component={() => <SignUpPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.FORGOT_PASSWORD}
          component={() => <Forgot refetch={refetch} />}
        />
        <Route
          exact
          path={routes.RESET}
          component={() => <Reset refetch={refetch} />}
        />
        <Route
          exact
          path={routes.CONFIRMATION}
          component={() => <Confirmation refetch={refetch} />}
        />

        <Route
          path="/"
          render={() => <Redirect to={routes.LANDING} />}
        />

        <Redirect to={routes.LANDING} />
      </Switch>
    </Fragment>
  </Router>
);

export default withSession(App);
