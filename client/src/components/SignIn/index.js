import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Footer from '../Footer';
import { SignUpLink } from '../SignUp';
import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import isLoggedIn from '../Session/isLoggedIn';
import { ForgotLink } from '../Forgot';
import { signOut } from '../SignOut';
import hidingTotoro from '../../resources/images/totoro.png';

import {
  Button,
  Form,
  Flex,
  SignInWrapper,
  Label,
  TotoroImage,
  H1,
  Back,
} from '../Universal/style';
import { SignInFormWrapper, SignInWidth, Input } from './style';
import Loading from '../Loading';

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

class SignInPage extends Component {
  componentDidMount() {
    signOut(this.props.client);
  }

  render() {
    const { history, refetch } = this.props;
    return (
      <Fragment>
        <Back>
          <SignInFormWrapper wrap="true">
            <H1 center width={'100%'}>
              Facial Detection App
            </H1>
            <SignInWidth>
              <h1>SignIn</h1>
              <SignInWrapper>
                <SignInForm history={history} refetch={refetch} />
                <Flex between>
                  <SignUpLink />
                  <ForgotLink />
                </Flex>
                <TotoroImage src={hidingTotoro} alt="Hiding Totoro" />
              </SignInWrapper>
            </SignInWidth>
          </SignInFormWrapper>
        </Back>
        <Footer />
      </Fragment>
    );
  }
}

const INITIAL_STATE = {
  login: '',
  password: '',
};

class SignInForm extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signIn.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;

    const isInvalid = password === '' || login === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <Form onSubmit={event => this.onSubmit(event, signIn)}>
            <Label>Your Email</Label>
            <Input
              name="login"
              value={login}
              onChange={this.onChange}
              type="email"
              placeholder="Email"
            />
            <Label second>Your Password</Label>
            <Input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <Button disabled={isInvalid || loading} type="submit">
              {loading ? <Loading /> : 'Sign In'}
            </Button>

            {error && <ErrorMessage error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

const SignInLink = () => (
  <p>
    Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
);

export default withRouter(
  isLoggedIn(session => session && session.me)(SignInPage),
);

export { SignInForm, SignInLink };
