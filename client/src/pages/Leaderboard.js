import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Leaderboard = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Assuming the leaderboard data is available in userData.leaderboard
  const leaderboardData = userData.leaderboard || [];

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Leaderboard</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>Top Players:</h2>
        {leaderboardData.length > 0 ? (
          <ul>
            {leaderboardData.map((player, index) => (
              <li key={player.id}>
                <p>
                  <span>{index + 1}. </span>
                  <span>{player.name}</span>
                  <span> - Score: {player.score}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </Container>
    </>
  );
};

export default Leaderboard;
