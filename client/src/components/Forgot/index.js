import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Footer from '../Footer';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Loading from '../Loading';
import isLoggedIn from '../Session/isLoggedIn';

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

const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email) {
      result
    }
  }
`;

const ForgotPage = ({ refetch }) => (
  <Fragment>
    <Back>
      <SignInFormWrapper wrap="true">
        <H1 center width={'100%'}>
          Facial Detection App
        </H1>
        <SignInWidth forgot>
          <h1>Reset password</h1>
          <SignInWrapper>
            <ForgotForm refetch={refetch} />
            <P backtologin>
              <Link to={routes.SIGN_IN}>Back to Login</Link>
            </P>
          </SignInWrapper>
        </SignInWidth>
      </SignInFormWrapper>
    </Back>
    <Footer />
  </Fragment>
);

const INITIAL_STATE = {
  email: '',
  sent: false,
};

class ForgotForm extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, forgotPassword) => {
    forgotPassword().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });
      this.setState({ sent: true });

      await this.props.refetch();
    });

    event.preventDefault();
  };

  render() {
    const { email, sent } = this.state;

    const isInvalid = email === '';

    return (
      <Mutation mutation={FORGOT_PASSWORD} variables={{ email }}>
        {(forgotPassword, { data, loading, error }) =>
          sent ? (
            <Notification>
              If the account exist, a password reset link will be sent
              to that email.
            </Notification>
          ) : (
            <Form
              onSubmit={event => this.onSubmit(event, forgotPassword)}
            >
              <Label>Your Email</Label>
              <Input
                name="email"
                value={email}
                onChange={this.onChange}
                type="email"
                placeholder="Enter your email"
              />
              <Button disabled={isInvalid || loading} type="submit">
                {loading ? <Loading /> : 'Send reset link'}
              </Button>

              {error && <ErrorMessage error={error} />}
            </Form>
          )
        }
      </Mutation>
    );
  }
}

const ForgotLink = () => (
  <p>
    <Link to={routes.FORGOT_PASSWORD}>Forgot Password</Link>
  </p>
);

export default withRouter(
  isLoggedIn(session => session && session.me)(ForgotPage),
);

export { ForgotForm, ForgotLink };
