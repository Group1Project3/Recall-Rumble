// setup for React and Apollo Client
import { gql } from '@apollo/client';

// setup for User data and any saved book data
// will need to change, include score, score history, and any other data (games played? etc)
export const GET_ME = gql`
  query me {
    me {
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
`;

export const CHECK_HS = gql`
  {
    checkHighScore {
      value
      highScore
      player {
        _id
      }
    }
  }
`;

export const LEADERBOARD = gql`
  {
    leaderboard {
      value
      player {
        _id
        username
      }
    }
  }
`;