import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ME, LEADERBOARD } from '../utils/queries';

const { Title } = Typography;

const Leaderboard = () => {
  const meQuery = useQuery(GET_ME);
  const leaderboardQuery = useQuery(LEADERBOARD);
  // eslint-disable-next-line no-unused-vars
  const userData = meQuery.data?.me || {};
  const leaderboardData = leaderboardQuery.data?.leaderboard || [];
  if (meQuery.loading || leaderboardQuery.loading) {
    return <h2>LOADING...</h2>;
  }

  const beginnerScores = []
  const intermediateScores = []
  const expertScores = []

  for (let i = 0; i < leaderboardData.length; i++) {
    const item = leaderboardData[i];
    if (item.difficulty === "beginner") {
      beginnerScores.push(item);
    } else if (item.difficulty === "intermediate") {
      intermediateScores.push(item);
    } else if (item.difficulty === "expert") {
      expertScores.push(item);
    }
  }

  const uniqueScoresEasy = beginnerScores
    .reduce((uniqueScores, score) => {
      const isDuplicate = uniqueScores.some((s) => (
        s.value === score.value && s.player._id === score.player._id
      ));
      if (!isDuplicate) {
        uniqueScores.push(score);
      }
      return uniqueScores;
    }, [])
    .sort((a, b) => a.value - b.value) // Sort scores in ascending order
    .slice(0, 10); // Limit to the top 10 scores

  const uniqueScoresMedium = intermediateScores
    .reduce((uniqueScores, score) => {
      const isDuplicate = uniqueScores.some((s) => (
        s.value === score.value && s.player._id === score.player._id
      ));
      if (!isDuplicate) {
        uniqueScores.push(score);
      }
      return uniqueScores;
    }, [])
    .sort((a, b) => a.value - b.value) // Sort scores in ascending order
    .slice(0, 10); // Limit to the top 10 scores

  const uniqueScoresHard = expertScores
    .reduce((uniqueScores, score) => {
      const isDuplicate = uniqueScores.some((s) => (
        s.value === score.value && s.player._id === score.player._id
      ));
      if (!isDuplicate) {
        uniqueScores.push(score);
      }
      return uniqueScores;
    }, [])
    .sort((a, b) => a.value - b.value) // Sort scores in ascending order
    .slice(0, 10); // Limit to the top 10 scores

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center' }}>Leaderboard</Title>
        </Col>
      </Row>
      <Row justify="center" className='leaderboard' style={{ marginTop: '20px' }}>
        <Col style={{ marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}>
          <Title style={{ textAlign: 'center' }} level={2}>Easy Highscores:</Title>
          {uniqueScoresEasy.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
              {uniqueScoresEasy.map((score, index) => (
                <li key={score.player._id}>
                  <Title level={4}>
                    <span>{index + 1}. </span>
                    <span>{score.player.username}</span>
                    <span> - Score: {score.value}</span>
                  </Title>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </Col>
        <Col style={{ marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}>
          <Title style={{ textAlign: 'center' }} level={2}>Medium Highscores:</Title>
          {uniqueScoresMedium.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
              {uniqueScoresMedium.map((score, index) => (
                <li key={score.player._id}>
                  <Title level={4}>
                    <span>{index + 1}. </span>
                    <span>{score.player.username}</span>
                    <span> - Score: {score.value}</span>
                  </Title>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </Col>
        <Col style={{ marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}>
          <Title style={{ textAlign: 'center' }} level={2}>Hard Highscores:</Title>
          {uniqueScoresHard.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
              {uniqueScoresHard.map((score, index) => (
                <li key={score.player._id}>
                  <Title level={4}>
                    <span>{index + 1}. </span>
                    <span>{score.player.username}</span>
                    <span> - Score: {score.value}</span>
                  </Title>
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
