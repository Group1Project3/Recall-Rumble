// This needs to be changed to Games.js and the content needs to be changed to the games page

// React setup
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// import the 'auth' setup
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
// need these to refactor for GraphQL API
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  // Fetch user data
  const { loading, data } = useQuery(GET_ME);
  // Mutation for removing a book
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Retrieve user data from the query response
  const userData = data?.me || {};

  // function to delete book from database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try-catch block for error handling
    try {
      // Remove the book from the database
      const response = await removeBook({ variables: { bookId } });
      console.log('Deleted record: ', response);
      if (error) {
        console.log(error);
      }
      // Remove the book from local storage
      removeBookId(bookId);
    } catch (err) {
      // display any caught errors here
      console.error(err);
    }
  };

  // Shows loading message while waiting for query response
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
