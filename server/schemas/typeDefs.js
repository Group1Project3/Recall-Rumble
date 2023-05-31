const { gql } = require('apollo-server-express');

// template typeDefs, subject to change
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input InputBook {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: InputBook!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;


// const typeDefs = gql`
//   type User {
//     _id: ID!
//     username: String!
//     email: String!
//     games: [Game]
//   }

//   type Game {
//     _id: ID!
//     name: String!
//     highscore: Int
//     comments: [Comment]
//   }

//   type Highscore {
//     game: Game!
//     score: Int!
//     user: User!
//   }

//   type Comment {
//     _id: ID!
//     game: Game!
//     user: User!
//     content: String!
//   }

//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Query {
//     me: User
//     getGameById(_id: ID!): Game
//     getLeaderboard(gameId: ID!): [Highscore]
//     getComments(gameId: ID!): [Comment]
//   }

//   input HighscoreInput {
//     gameId: ID!
//     score: Int!
//   }

//   input CommentInput {
//     gameId: ID!
//     content: String!
//   }

//   type Mutation {
//     login(email: String!, password: String!): Auth
//     createUser(username: String!, email: String!, password: String!): Auth
//     createHighscore(input: HighscoreInput!): Highscore
//     deleteHighscore(_id: ID!): Highscore
//     createComment(input: CommentInput!): Comment
//     updateComment(_id: ID!, content: String!): Comment
//     deleteComment(_id: ID!): Comment
//   }
// `;

// module.exports = typeDefs;
