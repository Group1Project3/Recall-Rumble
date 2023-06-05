// Import necessary modules and components
import React, { useState } from 'react'; // useState for local state management
import { Link } from 'react-router-dom'; // Link for routing between pages
import { Menu, Dropdown, Modal, Tabs } from 'antd'; // Ant Design components for UI
import SignUpForm from './SignupForm'; // Form for sign up
import LoginForm from './LoginForm'; // Form for login

import Auth from '../utils/auth'; // Authentication helper functions

// Destructuring TabPane from Tabs for ease of access
const { TabPane } = Tabs;

// Define the navigation bar component
const AppNavigationBar = () => {
  // Local state for showing/hiding the modal
  const [showModal, setShowModal] = useState(false);

  // Handler for click events on the dropdown menu
  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      Auth.logout();
    }
  };

  // Define the dropdown menu to be used with Ant Design's Dropdown
  const menu = (
    <Menu onClick={handleMenuClick} mode="vertical">
      <Menu.Item key="game">
        <Link to="/Game">Game</Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/Profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="leaderboard">
        <Link to="/Leaderboard">Leaderboard</Link>
      </Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  // Return the component JSX
  return (
    <>
      {/* Show the navigation bar with menu if the user is logged in */}
      {Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item key="dropdown">
            <Dropdown overlay={menu} placement="bottomRight">
              <span style={{ fontSize: '20px', color: 'white', paddingRight: '5px' }}>Menu</span>
            </Dropdown>
          </Menu.Item>
        </Menu>
      )}

      {/* Show the navigation bar with login/signup if the user is not logged in */}
      {!Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item key="login-signup" onClick={() => setShowModal(true)} style={{ color: 'white' }}>
            Login/Sign Up
          </Menu.Item>
        </Menu>
      )}

      {/* Show the modal for login/signup when showModal is true */}
      <Modal centered open={showModal} onCancel={() => setShowModal(false)} footer={null}>
        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Login" key="login">
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
          <TabPane tab="Sign Up" key="signup">
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

// Export the component for use in other files
export default AppNavigationBar;
