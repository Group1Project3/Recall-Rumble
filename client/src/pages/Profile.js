import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
// temporary es lint disable until implemented
// eslint-disable-next-line no-unused-vars
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Profile Page</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>Username: {userData.username}</h2>
        <h2>Email: {userData.email}</h2>
        <h2>High Score: {userData.highScore}</h2>
        <h2>Last Score: {userData.lastScore}</h2>
      </Container>
    </>
  );
};

export default Profile;
