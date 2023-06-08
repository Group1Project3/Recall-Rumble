import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, PROFILE} from '../utils/queries';
import { DELETE_SCORES } from '../utils/mutations';

const { Title } = Typography;

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  const profileQuery = useQuery(PROFILE)
  const profileData = profileQuery.data?.profile || undefined
let lastscore = userData.lastScore
  if(userData.lastScore === 99) {
    lastscore = "N/A"
  }
  let easyHighscore = "N/A"
  let mediumHighscore = "N/A"
  let hardHighscore = "N/A"


  // eslint-disable-next-line no-unused-vars
  const [deleteScores, { error }] = useMutation(DELETE_SCORES)

  // If no scores recorded, display N/A
  if (profileData !== undefined) {
    for (let i = 0; i < profileData.length; i++) {
      if(profileData[i].difficulty === 'beginner') {
        easyHighscore = profileData[i].value
      } else if(profileData[i].difficulty === 'intermediate') {
        mediumHighscore = profileData[i].value
      } else if(profileData[i].difficulty === 'expert') {
        hardHighscore = profileData[i].value
      }
    }
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
            Easy High Score: {easyHighscore}
          </Title>
          <Title level={2} style={{ textAlign: 'center' }}>
            Medium High Score: {mediumHighscore}
          </Title>
          <Title level={2} style={{ textAlign: 'center' }}>
            Hard High Score: {hardHighscore}
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
