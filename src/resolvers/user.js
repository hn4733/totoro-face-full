import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn) => {
  const { id, firstname, lastname } = user;
  return await jwt.sign({ id, firstname, lastname }, secret, {
    expiresIn,
  });
};

const createTokenSignUp = async (
  user,
  emailSecret,
  expiresIn,
  transporter
) => {
  const { id, firstname, lastname, email } = user;
  return await jwt.sign(
    { id, firstname, lastname },
    emailSecret,
    {
      expiresIn,
    },
    (err, emailToken) => {
      const url = `https://facedetectionapp.hnbuilds.com/confirmation/${emailToken}`;

      transporter.sendMail(
        {
          from:
            '"Face Detection App" <noreply@facedetectionapp.hnbuilds.com>',
          to: email,
          subject: 'Confirm email for the Face Detection App',
          html: `
      <div>
        <h2 style="margin-top:0;">Hi ${firstname}!</h2>
        <h3>Thanks for signing up to the Face Detection App</h3>
        <p>Please click the link below to verify your email address:</p>
        <div style="margin-top:20px;height:200px;">
          <a style="padding:10px 30px;font-size:14px;border:1px solid #D0D0D0;border-radius:3px;cursor:pointer;color:#2c2c2c;text-decoration:none;" href="${url}">
            Verification Link
          </a>
        </div>
      </div>`,
        },
        function(err, info) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
};

const createTokenPassReset = async (
  user,
  emailSecret,
  expiresIn,
  transporter
) => {
  const { id, firstname, email } = user;
  await jwt.sign(
    { id, firstname, email },
    emailSecret,
    {
      expiresIn,
    },
    (err, resetToken) => {
      const url = `https://facedetectionapp.hnbuilds.com/forgot/${resetToken}`;

      transporter.sendMail(
        {
          from:
            '"Face Detection App" <noreply@facedetectionapp.hnbuilds.com>',
          to: email,
          subject: 'Reset Password Link - Face Detection App',
          html: `
      <div>
        <h2 style="margin-top:0;">Hi ${firstname}!</h2>
        <h3>You have requested to reset your password.</h3>
        <p>Please click the link below to reset your password</p>
        <div style="margin-top:20px;height: 200px;">
          <a style="padding:10px 30px;font-size:14px;border:1px solid #D0D0D0;border-radius:3px;cursor:pointer;color:#2c2c2c;text-decoration:none;" href="${url}">
            Reset Password Link
          </a>
        </div>
      </div>`,
        },
        function(err, info) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { firstname, lastname, phone, email, password },
      { models, emailSecret, transporter }
    ) => {
      let user = await models.User.findByLogin(email);

      if (user) {
        if (user.confirmed) {
          throw new UserInputError(
            `Account with email ${email} has already been used. Please register with a different email`
          );
        } else {
          throw new UserInputError(
            `An email has already been sent to ${email}. Please click on the link to verify`
          );
        }
      } else {
        user = await models.User.create({
          firstname,
          lastname,
          phone,
          email,
          password,
        });

        await createTokenSignUp(
          user,
          emailSecret,
          '30m',
          transporter
        );

        return { result: true };
      }
    },

    confirmationToken: async (parent, { token }, { models }) => {
      try {
        const { id } = await jwt.verify(
          token,
          process.env.SECRET_EMAIL
        );
        await models.User.update(
          { confirmed: true },
          { where: { id } }
        );
        return { result: true };
      } catch (e) {
        const { id } = jwt.decode(token);
        await models.User.destroy({ where: { id } });
        throw new UserInputError(
          'Either the token has expired or the url is invalid. Please register again.'
        );
      }
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret }
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.'
        );
      }

      if (!user.confirmed) {
        throw new AuthenticationError(
          'You have not activated your verification link. Please verify your email before proceeding.'
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '1m') };
    },

    forgotPassword: async (
      parent,
      { email },
      { models, emailSecret, transporter }
    ) => {
      const user = await models.User.findByLogin(email);

      if (!user) {
        return { result: false };
      }

      await createTokenPassReset(
        user,
        emailSecret,
        '15m',
        transporter
      );
      return { result: true };
    },

    checkResetToken: async (
      parent,
      { token },
      { models, emailSecret }
    ) => {
      try {
        await jwt.verify(token, emailSecret);

        return { result: true };
      } catch (e) {
        throw new UserInputError(
          'The password reset link has either expired or does not exist. Please resubmit a request again.'
        );
      }
    },

    updateToken: async (parent, { token }, { secret }) => {
      if (token.length > 0) {
        const user = await jwt.verify(token, secret);
        if (user) {
          const { id, firstname, lastname } = user;
          const expiresIn = '45m';
          const newToken = await jwt.sign(
            { id, firstname, lastname },
            secret,
            {
              expiresIn,
            }
          );

          return { token: newToken };
        }
      }
    },

    resetPassword: async (
      parent,
      { thePassword, token },
      { models, transporter }
    ) => {
      if (thePassword && thePassword.length > 6) {
        const { id, firstname, email } = await jwt.decode(token);
        const { password } = await models.User.findByPk(id);
        const isValid = await bcrypt.compare(thePassword, password);

        if (isValid) {
          throw new UserInputError(
            'Password cannot be the same as the old password.'
          );
        }

        const saltRounds = 10;
        const newPassword = await bcrypt.hash(
          thePassword,
          saltRounds
        );

        await models.User.update(
          { password: newPassword },
          { where: { id } }
        );
        await transporter.sendMail({
          from:
            '"Face Detection App" <noreply@facedetectionapp.hnbuilds.com>',
          to: email,
          subject: 'Password Updated - Face Detection App',
          html: `
            <div>
                <h2 style="margin-top:0;">Hi ${firstname}!</h2>
                <p>Your password has recently been updated on the Face Detection App.</p>
            </div>`,
        });

        return { result: true };
      } else {
        throw new UserInputError(
          'Password must be at least 7 characters long'
        );
      }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (
        parent,
        {
          firstname,
          lastname,
          phone,
          email,
          about,
          tennisCourt,
          playTime,
        },
        { models, me, secret }
      ) => {
        const user = await models.User.findByPk(me.id);

        return await user.update({
          firstname,
          lastname,
          phone,
          email,
          about,
          tennisCourt,
          playTime,
        });
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      }
    ),
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};
