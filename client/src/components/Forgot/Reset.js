import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Footer from '../Footer';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Loading from '../Loading';
import isLoggedIn from '../Session/isLoggedIn';

import { ForgotForm } from './index';

import {
  Button,
  Form,
  SignInWrapper,
  Label,
  H1,
  P,
  Back,
} from '../Universal/style';
import {
  SignInFormWrapper,
  SignInWidth,
  Input,
} from '../SignIn/style';
import { Notification } from '../SignUp/style';

const RESET_PASSWORD = gql`
  mutation($password: String!, $token: String!) {
    resetPassword(thePassword: $password, token: $token) {
      result
    }
  }
`;
const CHECK_RESET_TOKEN = gql`
  mutation($token: String!) {
    checkResetToken(token: $token) {
      result
    }
  }
`;

const ResetPage = props => {
  const { token } = props.match.params;
  return (
    <Fragment>
      <Back>
        <SignInFormWrapper wrap="true">
          <H1 center width={'100%'}>
            Facial Detection App
          </H1>
          <SignInWidth forgot>
            <h1>Reset password</h1>
            <Mutation
              mutation={CHECK_RESET_TOKEN}
              variables={{ token }}
            >
              {(checkResetToken, { data, loading, error }) => (
                <StartMutationOnMount
                  checkResetToken={checkResetToken}
                  {...props}
                  loading={loading}
                  checkError={error}
                  data={data}
                >
                  <SignInWrapper>
                    <ResetForm refetch={props.refetch} {...props} />
                    <P backtologin>
                      <Link to={routes.SIGN_IN}>Back to Login</Link>
                    </P>
                  </SignInWrapper>
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
    this.props.checkResetToken();
  }

  render() {
    const { checkError, loading, data } = this.props;
    return (
      <div>
        {loading && <Loading />}
        {checkError && (
          <div>
            <ErrorMessage error={checkError} />
            <SignInWrapper>
              <ForgotForm refetch={this.props.refetch} />
            </SignInWrapper>
            <P backtologin>
              <Link to={routes.SIGN_IN}>Back to Login</Link>
            </P>
          </div>
        )}
        {data && <div>{this.props.children}</div>}
      </div>
    );
  }
}

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
  sent: false,
};

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, resetPassword) => {
    resetPassword().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });
      this.setState({ sent: true });

      await this.props.refetch();
    });

    event.preventDefault();
  };

  render() {
    const { token } = this.props.match.params;
    const { password, confirmPassword, sent } = this.state;

    const isInvalid =
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword;

    return (
      <Mutation
        mutation={RESET_PASSWORD}
        variables={{ password, token }}
      >
        {(resetPassword, { data, loading, error }) => (
          <div>
            {sent ? (
              <Notification>
                Password was successfully updated.
              </Notification>
            ) : (
              <Form
                onSubmit={event =>
                  this.onSubmit(event, resetPassword)
                }
              >
                <Label>New Password</Label>
                <Input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New password"
                />
                <Label>Confirm New Password</Label>
                <Input
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New password"
                />
                <Button disabled={isInvalid || loading} type="submit">
                  {loading ? <Loading /> : 'Reset Password'}
                </Button>

                {error && <ErrorMessage error={error} />}
              </Form>
            )}
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(
  isLoggedIn(session => session && session.me)(ResetPage),
);
