import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Logout from './components/Logout';
import Navbar from './components/navbar';

// Import statements...

function App() {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </Router>
  );
}

export default App;

