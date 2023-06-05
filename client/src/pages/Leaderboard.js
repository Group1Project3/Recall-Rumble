import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ME, LEADERBOARD } from '../utils/queries';

const { Title } = Typography;

const Leaderboard = () => {
  const meQuery = useQuery(GET_ME);
  const leaderboardQuery = useQuery(LEADERBOARD)
  // eslint-disable-next-line no-unused-vars
  const userData = meQuery.data?.me || {};
  const leaderboardData = leaderboardQuery.data?.leaderboard || [];

  if (meQuery.loading || leaderboardQuery.loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center' }}>Leaderboard</Title>
        </Col>
      </Row>
      <Row justify="center" className='leaderboard' style={{ marginTop: '20px' }}>
        <Col>
          <Title level={2}>Top Players:</Title>
          {leaderboardData.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
              {leaderboardData.map((score, index) => (
                <li key={score.player._id}>
                  <p>
                    <span>{index + 1}. </span>
                    <span>{score.player.username}</span>
                    <span> - Score: {score.value}</span>
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
