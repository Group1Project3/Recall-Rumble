// basic setup for resolvers
// need to be modified to accommodate new content (remove book content)
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Retrieve user data if logged in
        data = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return data; // Return the user data
      }
      throw new AuthenticationError('You need to be logged in!'); // Throw an error if not logged in
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Create a new user
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // User login
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found. Do you have an account?');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
