import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      id
      firstname
      lastname
      phone
      email
      confirmed
      createdAt
    }
  }
`;
