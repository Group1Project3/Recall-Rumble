import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_SCORES } from '../utils/mutations';

const { Title } = Typography;

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  let highscore = ""
  let lastscore = ""

  // eslint-disable-next-line no-unused-vars
  const [deleteScores, { error }] = useMutation(DELETE_SCORES)

  // If no scores recorded, display N/A
  if (userData.highScore === 99) {
    highscore = "N/A"
    lastscore = "N/A"
  } else {
    highscore = userData.highScore
    lastscore = userData.lastScore
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const DeleteScoreHandler = async () => {
    try {
      await deleteScores({
        variables: {
          player: userData._id
        }
      })
      window.location.reload(true)
    } catch (err) {
      console.error(JSON.stringify(err))
    }
  }

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center' }}>Profile Page</Title>
        </Col>
      </Row>
      <Row justify="center" className='profile' style={{ marginTop: '20px' }}>
        <Col>
          <Title level={2} style={{ textAlign: 'center' }}>
            Username: {userData.username}
          </Title>
          <Title level={2} style={{ textAlign: 'center' }}>
            Email: {userData.email}
          </Title>
          <Title level={2} style={{ textAlign: 'center' }}>
            High Score: {highscore}
          </Title>
          <Title level={2} style={{ textAlign: 'center' }}>
            Last Score: {lastscore}
          </Title>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary' danger onClick={DeleteScoreHandler}>
              Delete Scores
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
