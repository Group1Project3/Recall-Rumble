import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navigationbar';
import Games from './pages/Game';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
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
            <Route path='/' element={<Games />} />
            <Route path='/Game' element={<PrivateRoutes><Games /></PrivateRoutes>} />
            <Route path='/Profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path='/Leaderboard' element={<PrivateRoutes><Leaderboard /></PrivateRoutes>} />
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
