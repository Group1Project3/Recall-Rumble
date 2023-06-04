// initial setup for Apollo Client for React
import { gql } from '@apollo/client';

// boilerplate for User login controls
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// modify for refactored code
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        highScore
        lastScore
        friends {
          _id
        }
      }
    }
  }
`;

export const SAVE_SCORE = gql`
  mutation saveScore($value: Int!, $highScore: Boolean!, $globalHigh: Boolean!, $player: ID!) {
    saveScore(value: $value, highScore: $highScore, globalHigh: $globalHigh, player: $player){
      value
      highScore
      globalHigh
      player
    }
  }
`;

export const UPDATE_OLD_HIGH = gql`
  mutation updateOldHigh($player: ID!) {
    updateOldHigh(player: $player) {
      value
      highScore
      globalHigh
      player
    }
  }
`;

export const UPDATE_OLD_GLOBAL = gql`
  mutation updateOldGlobal($player: ID!) {
    updateOldGlobal(player: $player) {
      value
      highScore
      globalHigh
      player
    }
  }
`;

// template code for reference
// import { gql } from '@apollo/client';

// export const USER_LOGIN = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

// export const CREATE_USER = gql`
//   mutation CreateUser($username: String!, $email: String!, $password: String!) {
//     createUser(username: $username, email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
//   mutation AddComment($gameId: ID!, $comment: String!) {
//     addComment(gameId: $gameId, comment: $comment) {
//       _id
//       name
//       highscore
//       comments {
//         _id
//         text
//       }
//     }
//   }
// `;

// export const EDIT_COMMENT = gql`
//   mutation EditComment($commentId: ID!, $text: String!) {
//     editComment(commentId: $commentId, text: $text) {
//       _id
//       name
//       highscore
//       comments {
//         _id
//         text
//       }
//     }
//   }
// `;

// export const DELETE_COMMENT = gql`
//   mutation DeleteComment($commentId: ID!) {
//     deleteComment(commentId: $commentId) {
//       _id
//       name
//       highscore
//       comments {
//         _id
//         text
//       }
//     }
//   }
// `;

// export const SET_SCORE = gql`
//   mutation SetScore($gameId: ID!, $score: Int!) {
//     setScore(gameId: $gameId, score: $score) {
//       _id
//       name
//       highscore
//     }
//   }
// `;

// export const UPDATE_SCORE = gql`
//   mutation UpdateScore($gameId: ID!, $score: Int!) {
//     updateScore(gameId: $gameId, score: $score) {
//       _id
//       name
//       highscore
//     }
//   }
// `;

// export const DELETE_SCORE = gql`
//   mutation DeleteScore($gameId: ID!) {
//     deleteScore(gameId: $gameId) {
//       _id
//       name
//       highscore
//     }
//   }
// `;