import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const { Title } = Typography;

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>Profile Page</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Title level={2}>Username: {userData.username}</Title>
          <Title level={2}>Email: {userData.email}</Title>
          <Title level={2}>High Score: {userData.highScore}</Title>
          <Title level={2}>Last Score: {userData.lastScore}</Title>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
