// basic setup for resolvers
// need to be modified to accommodate new content (remove book content)
const { AuthenticationError } = require('apollo-server-express');
const { User, Score } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Retrieve user data if logged in
        return User.findOne({ _id: context.user._id }).select('-__v -password');
      }
      throw new AuthenticationError('You need to be logged in!'); // Throw an error if not logged in
    },
    checkHighScore: async (parent, args, context) => {
      return Score.findOne({player: context.user._id, highScore: true})
    },
    checkGlobalHigh: async (parent, args) => {
      return Score.findOne({globalHigh: true})
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
    saveScore: async (parent, {value, highScore, globalHigh, player}, context) => {
      return await Score.create({
        value,
        highScore,
        globalHigh,
        player
      })
    },
    updateOldHigh: async (parent, { high }, context) => {
      const updatedHS = await Score.findOneAndUpdate(
        { player: context.user._id, highScore: true },
        { highScore: false },
        { new: true }
      )
      return updatedHS
    },
    updateGlobalHigh: async (parent, { global }, context) => {
      const updatedGlobal = await Score.findOneAndUpdate(
        { globalHigh: true },
        { globalHigh: false },
        { new: true }
      )
      return updatedGlobal
    },
  },
};

module.exports = resolvers;
