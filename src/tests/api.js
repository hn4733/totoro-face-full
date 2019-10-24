import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  });

export const me = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          me {
            id
            email
            firstname
            lastname
            phone
          }
        }
      `,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  );

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          firstname
          lastname
          phone
          email
          role
        }
      }
    `,
    variables,
  });

export const users = async () =>
  axios.post(API_URL, {
    query: `
      {
        users {
          id
          firstname
          lastname
          phone
          email
          role
        }
      }
    `,
  });

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $firstname: String!,
        $lastname: String!,
        $phone: String!,
        $email: String!,
        $password: String!
      ) {
        signUp(
          firstname: $firstname,
          lastname: $lastname,
          phone: $phone,
          email: $email,
          password: $password
        ) {
          token
        }
      }
    `,
    variables,
  });

export const updateUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($firstname: String!, $lastname: String!, $phone: String!, $email: String!) {
          updateUser(firstname: $firstname, lastname: $lastname, phone: $phone, email: $email) {
            firstname
            lastname
            phone
            email
          }
        }
      `,
      variables,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  );

export const deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  );
