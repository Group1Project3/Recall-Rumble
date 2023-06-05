import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navigationbar';
import Intro from './pages/Intro';
import Games from './pages/Game';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Stripe from './pages/Stripe';
import Canceled from './pages/Canceled';
import PrivateRoutes from './components/PrivateRoutes';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Intro />} />
            <Route path='/Game' element={<PrivateRoutes><Games /></PrivateRoutes>} />
            <Route path='/Profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path='/Leaderboard' element={<PrivateRoutes><Leaderboard /></PrivateRoutes>} />
            <Route path='/Donate' element={<PrivateRoutes><Stripe /></PrivateRoutes>} />
            <Route path='/Canceled' element={<PrivateRoutes><Canceled /></PrivateRoutes>} />
            <Route path='*' element={<Link to="/" style={{ textDecoration: 'none' }}>
              <div style={{
                textAlign: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '50px',
                backgroundColor: 'red', // this is the background color
                padding: '20px', // adding some padding to create space around the text
              }}>
                Woops! Click me to return home!
              </div></Link>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
