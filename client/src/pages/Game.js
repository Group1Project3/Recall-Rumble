import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Games = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Game Page</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>Game page</h2>
        {/* Add your game components and logic here */}
      </Container>
    </>
  );
};

export default Games;
