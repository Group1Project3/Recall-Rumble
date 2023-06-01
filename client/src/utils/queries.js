// setup for React and Apollo Client
import { gql } from '@apollo/client';

// setup for User data and any saved book data
// will need to change, include score, score history, and any other data (games played? etc)
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      highScore
      lastScore
      friendCount
      friends {
        _id
      }
    }
  }
`;
