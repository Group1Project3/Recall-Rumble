import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ME, LEADERBOARD } from '../utils/queries';

const { Title } = Typography;

const Leaderboard = () => {
  const meQuery = useQuery(GET_ME);
  const leaderboardQuery = useQuery(LEADERBOARD)
  const userData = meQuery.data?.me || {};
  const leaderboardData = leaderboardQuery?.data || [];
  if (meQuery.loading) {
    return <h2>LOADING...</h2>;
  }
  
  console.log(leaderboardQuery)
  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#000', color: '#fff' }}>
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
                <li key={player.player}>
                  <p>
                    <span>{index + 1}. </span>
                    <span>{player.player}</span>
                    <span> - Score: {player.value}</span>
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
