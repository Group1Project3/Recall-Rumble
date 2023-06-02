import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Modal, Tabs } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const { TabPane } = Tabs;

const AppNavigationBar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      Auth.logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} mode="horizontal">
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

  return (
    <>
      {Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item key="dropdown">
            <Dropdown overlay={menu} placement="bottomRight">
              <span style={{ fontSize: '20px', color: 'white',paddingRight: '5px' }}>Menu</span>
            </Dropdown>
          </Menu.Item>
        </Menu>
      )}

      {!Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', justifyContent: 'space-between' }}>
          <span key="home" style={{ fontSize: '20px', padding: '0 15px', cursor: 'default', marginRight: 'auto', color: 'white' }}>Recall Rumble</span>
          <Menu.Item key="login-signup" onClick={() => setShowModal(true)}>
            Login/Sign Up
          </Menu.Item>
        </Menu>
      )}

      <Modal centered visible={showModal} onCancel={() => setShowModal(false)} footer={null}>
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

export default AppNavigationBar;
