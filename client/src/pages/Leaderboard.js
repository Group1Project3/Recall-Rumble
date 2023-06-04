import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const { Title } = Typography;

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
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>Leaderboard</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Title level={2}>Top Players:</Title>
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
        </Col>
      </Row>
    </>
  );
};

export default Leaderboard;
