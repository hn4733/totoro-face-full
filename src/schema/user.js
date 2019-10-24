import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      firstname: String!
      lastname: String!
      phone: String!
      email: String!
      password: String!
    ): Result!

    signIn(login: String!, password: String!): Token!
    updateUser(
      firstname: String!
      lastname: String!
      phone: String!
      email: String!
    ): User!
    deleteUser(id: ID!): Boolean!

    confirmationToken(token: String!): Result!
    forgotPassword(email: String!): Result!
    checkResetToken(token: String!): Result!
    resetPassword(thePassword: String!, token: String!): Result!

    updateToken(token: String!): Token!
  }

  type Result {
    result: Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    phone: String!
    email: String!
    confirmed: Boolean!
    createdAt: Date!
    messages: [Message!]
  }
`;
