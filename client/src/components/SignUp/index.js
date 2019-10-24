import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import isLoggedIn from '../Session/isLoggedIn';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Footer from '../Footer';
import { SignInLink } from '../SignIn';
import Loading from '../Loading';
import {
  Button,
  Form,
  SignInWrapper,
  Label,
  TotoroSitting,
  H1,
  Back,
} from '../Universal/style';
import {
  SignUpFormWrapper,
  SignUpWidth,
  Input,
  Notification,
  InputWrapper,
} from './style';
import totoroSitting from '../../resources/images/totoro-sitting.png';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';

const SIGN_UP = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstname: $firstname
      lastname: $lastname
      phone: $phone
      email: $email
      password: $password
    ) {
      result
    }
  }
`;

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  success: false,
};

const SignUpPage = ({ history, refetch }) => (
  <Fragment>
    <Back>
      <SignUpFormWrapper wrap="true">
        <H1 center width={'100%'}>
          Facial Detection App
        </H1>
        <SignUpWidth>
          <h1>SignUp</h1>
          <SignInWrapper>
            <SignUpForm history={history} refetch={refetch} />
            <SignInLink />
            <TotoroSitting src={totoroSitting} alt="Totoro sitting" />
          </SignInWrapper>
        </SignUpWidth>
      </SignUpFormWrapper>
    </Back>
    <Footer />
  </Fragment>
);

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });
      this.setState({ success: data.signUp.result });
      await this.props.refetch();
      // this.props.history.push(routes.SIGN_UP);
    });

    event.preventDefault();
  };

  render() {
    const {
      firstname,
      lastname,
      phone,
      email,
      password,
      passwordConfirmation,
      success,
    } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '' ||
      firstname === '' ||
      lastname === '' ||
      phone === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ firstname, lastname, phone, email, password }}
      >
        {(signUp, { data, loading, error }) =>
          success ? (
            <Notification>
              A validation link has been sent to your email. Please
              click on it to verify.
            </Notification>
          ) : (
            <Form
              signup
              onSubmit={event => this.onSubmit(event, signUp)}
            >
              <InputWrapper>
                <Label signup>Firstname</Label>
                <Input
                  name="firstname"
                  value={firstname}
                  onChange={this.onChange}
                  type="text"
                  placeholder="First Name"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Lastname</Label>
                <Input
                  name="lastname"
                  value={lastname}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Last Name"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Phone Number"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Password</Label>
                <Input
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Confirm Password</Label>
                <Input
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </InputWrapper>
              <Button disabled={isInvalid || loading} type="submit">
                {loading ? <Loading /> : 'Sign Up'}
              </Button>

              {error && <ErrorMessage error={error} />}
            </Form>
          )
        }
      </Mutation>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(
  isLoggedIn(session => session && session.me)(SignUpPage),
);

export { SignUpForm, SignUpLink };
