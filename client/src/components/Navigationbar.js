import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Modal, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="home" as={Link} to="/">
            Recall Rumble
          </Menu.Item>
          <Dropdown overlay={menu} placement="bottomRight">
            <Menu.Item key="dropdown" style={{ float: 'right' }}>
              <UserOutlined />
            </Menu.Item>
          </Dropdown>
        </Menu>
      )}

      {!Auth.loggedIn() && (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="home" as={Link} to="/">
            Recall Rumble
          </Menu.Item>
          <Menu.Item key="login-signup" style={{ float: 'right' }} onClick={() => setShowModal(true)}>
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