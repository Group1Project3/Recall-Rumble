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
  mutation saveScore($value: Int!, $highScore: Boolean!, $player: ID!) {
    saveScore(value: $value, highScore: $highScore, player: $player){
      value
      highScore
      player {
        _id
      }
    }
  }
`;

export const UPDATE_OLD_HIGH = gql`
  mutation updateOldHigh($player: ID!) {
    updateOldHigh(player: $player) {
      value
      highScore
      player {
        _id
      }
    }
  }
`;

export const UPDATE_PLAYER_HIGH = gql`
  mutation updatePlayerHigh($_id: ID!, $highScore: Int!) {
    updatePlayerHigh(_id: $_id, highScore: $highScore) {
      _id
      highScore
      lastScore
    }
  }
`;

export const LAST_SCORE = gql`
  mutation lastScore($_id: ID!, $lastScore: Int!) {
    lastScore(_id: $_id, lastScore: $lastScore) {
      _id
      lastScore
    }
  }
`;

export const DELETE_SCORES = gql`
  mutation deleteScores($player: ID!) {
    deleteScores(player: $player) {
      _id
    }
  }
`;
