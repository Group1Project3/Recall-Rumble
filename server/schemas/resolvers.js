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
        data = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return data; // Return the user data
      }
      throw new AuthenticationError('You need to be logged in!'); // Throw an error if not logged in
    },
    checkHighScore: async (parent, score, context) => {
      const oldScore = await Score.findOne({player: context.user._id, highScore: true})
      if(score < oldScore) {
        return true
      } else {
        return false
      }
    },
    checkGlobalHigh: async (parent, score) => {
      const oldScore = await Score.findOne({globalHigh: true})
      if(score < oldScore) {
        return true
      } else {
        return false
      }
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
    saveScore: async (parent, {score, high, global}, context) => {
      const newScore = await Score.create({
        value: score,
        highScore: high,
        globalHigh: global,
        player: context.user._id
      })
      const lastGame = await User.findOneAndUpdate({_id: context.user._id},
        { lastScore: score}
        )
      return { newScore }
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
