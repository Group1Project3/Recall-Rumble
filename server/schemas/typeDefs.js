const { gql } = require('apollo-server-express');

// template typeDefs, subject to change
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        highScore: Int
        lastScore: Int
        friends: [User]!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Score {
        value: Int
        highScore: Boolean
        player: User
    }
    type Query {
        me: User
        checkHighScore: Score
        leaderboard: [Score]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveScore(value: Int!, highScore: Boolean!, player: ID!): Score
        updateOldHigh(player: ID!): Score
        updatePlayerHigh(_id: ID!, highScore: Int!): User
        lastScore(_id: ID!, lastScore: Int!): User
        deleteScores(player: ID!): User
    }
`;

module.exports = typeDefs;
