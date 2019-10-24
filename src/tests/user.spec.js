import { expect } from 'chai';

import * as userApi from './api';

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '1',
            firstname: 'henry',
            lastname: 'lemonade',
            phone: '401312321312',
            email: 'hello@henry.com',
            role: 'ADMIN',
          },
        },
      };

      const result = await userApi.user({ id: '1' });

      expect(result.data).to.eql(expectedResult);
    });

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null,
        },
      };

      const result = await userApi.user({ id: '42' });

      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('users: [User!]', () => {
    it('returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              id: '1',
              firstname: 'henry',
              lastname: 'lemonade',
              phone: '401312321312',
              email: 'hello@henry.com',
              role: 'ADMIN',
            },
            {
              id: '2',
              firstname: 'tomoko',
              lastname: 'japanese',
              phone: '23553532434',
              email: 'hello@tomoko.com',
              role: null,
            },
            {
              id: '3',
              firstname: 'Magical',
              lastname: 'Unicorn',
              phone: '2355353224234',
              email: 'hello@unicorn.com',
              role: null,
            },
            {
              id: '4',
              firstname: 'Speed',
              lastname: 'Racer',
              phone: '235532443434',
              email: 'hello@speedracer.com',
              role: null,
            }
          ],
        },
      };

      const result = await userApi.users();

      expect(result.data).to.eql(expectedResult);
    });
  });

  describe('me: User', () => {
    it('returns null when no user is signed in', async () => {
      const expectedResult = {
        data: {
          me: null,
        },
      };

      const { data } = await userApi.me();

      expect(data).to.eql(expectedResult);
    });

    it('returns me when me is signed in', async () => {
      const expectedResult = {
        data: {
          me: {
            id: '1',
            firstname: 'henry',
            lastname: 'lemonade',
            phone: '401312321312',
            email: 'hello@henry.com',
          },
        },
      };

      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'hello@henry.com',
        password: 'henrynguyen',
      });

      const { data } = await userApi.me(token);

      expect(data).to.eql(expectedResult);
    });
  });

  describe('signUp, updateUser, deleteUser', () => {
    it('signs up a user, updates a user and deletes the user as admin', async () => {
      // sign up

      let {
        data: {
          data: {
            signUp: { token },
          },
        },
      } = await userApi.signUp({
        firstname: 'Mark',
        lastname: 'Tobs',
        phone: '123123123',
        email: 'mark@gmule.com',
        password: 'asdasdasd',
      });

      const {
        data: {
          data: { me },
        },
      } = await userApi.me(token);

      expect(me).to.eql({
        id: '5',
        firstname: 'Mark',
        lastname: 'Tobs',
        phone: '123123123',
        email: 'mark@gmule.com',
      });

      // update as user

      const {
        data: {
          data: { updateUser },
        },
      } = await userApi.updateUser({ firstname: 'Mark1', lastname: 'Tobs', phone: '123123123', email: 'mark@gmule.com' }, token);

      expect(updateUser.firstname).to.eql('Mark1');

      // delete as admin

      const {
        data: {
          data: {
            signIn: { token: adminToken },
          },
        },
      } = await userApi.signIn({
        login: 'hello@henry.com',
        password: 'henrynguyen',
      });

      const {
        data: {
          data: { deleteUser },
        },
      } = await userApi.deleteUser({ id: me.id }, adminToken);

      expect(deleteUser).to.eql(true);
    });
  });

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'hello@tomoko.com',
        password: 'tomokokawaguchi',
      });

      const {
        data: { errors },
      } = await userApi.deleteUser({ id: '1' }, token);

      expect(errors[0].message).to.eql('Not authorized as admin.');
    });
  });

  describe('updateUser(firstname: String!, lastname: String!, phone: String!, email: String!): User!', () => {
    it('returns an error because only authenticated users can update a user', async () => {
      const {
        data: { errors },
      } = await userApi.updateUser({ firstname: 'Mark2', lastname: 'bombom', phone: '123234123', email: 'mark@mark.com' });

      expect(errors[0].message).to.eql('Not authenticated as user.');
    });
  });

  describe('signIn(login: String!, password: String!): Token!', () => {
    it('returns a token when a user signs in with email', async () => {
      const {
        data: {
          data: {
            signIn: { token },
          },
        },
      } = await userApi.signIn({
        login: 'hello@henry.com',
        password: 'henrynguyen',
      });

      expect(token).to.be.a('string');
    });

    it('returns an error when a user provides a wrong password', async () => {
      const {
        data: { errors },
      } = await userApi.signIn({
        login: 'hello@henry.com',
        password: 'dontknow',
      });

      expect(errors[0].message).to.eql('Invalid password.');
    });
  });

  it('returns an error when a user is not found', async () => {
    const {
      data: { errors },
    } = await userApi.signIn({
      login: 'dontknow',
      password: 'elephant',
    });

    expect(errors[0].message).to.eql(
      'No user found with this login credentials.',
    );
  });
});
