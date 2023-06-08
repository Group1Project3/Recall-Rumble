import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Dropdown, Modal, Tabs } from "antd";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const { TabPane } = Tabs;

const isGamePage = pathname => {
  return pathname.startsWith('/Game');
};

const AppNavigationBar = () => {
  const location = useLocation(); // Hook to access the current location

  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      Auth.logout();
    }
  };

  const handleDifficultyLevel = ({ key }) => {
    window.location.reload();
  };

  const selectedKey = isGamePage(location.pathname) ? '/Game' : location.pathname;

  const difficultyLevel = (
    <Menu onClick={handleDifficultyLevel} selectedKeys={[location.pathname]}>
      <Menu.Item key="/Game/beginner">
        <Link to="/Game/beginner">Easy</Link>
      </Menu.Item>
      <Menu.Item key="/Game/intermediate">
        <Link to="/Game/intermediate">Medium</Link>
      </Menu.Item>
      <Menu.Item key="/Game/expert">
        <Link to="/Game/expert">Hard</Link>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[selectedKey]}>
      <Menu.Item key="/Game">
        <Dropdown overlay={difficultyLevel} trigger={["hover"]} placement="rightTop">
          <span>Game</span>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key="/Profile">
        <Link to="/Profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="/Leaderboard">
        <Link to="/Leaderboard">Leaderboard</Link>
      </Menu.Item>
      <Menu.Item key="/Donate">
        <Link to="/Donate">Support Us</Link>
      </Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      {Auth.loggedIn() && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]} // Highlight the active page
          style={{ lineHeight: "64px", justifyContent: "space-between" }}
        >
          <span
            key="home"
            style={{
              fontSize: "20px",
              padding: "0 15px",
              cursor: "default",
              marginRight: "auto",
              color: "white",
            }}
          >
            Recall Rumble
          </span>
          <Menu.Item key="dropdown">
            <Dropdown overlay={menu} trigger={["hover"]} placement="bottomRight">
              <span
                style={{
                  fontSize: "20px",
                  color: "white",
                  paddingRight: "5px",
                }}
              >
                Menu
              </span>
            </Dropdown>
          </Menu.Item>
        </Menu>
      )}

      {!Auth.loggedIn() && (
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px", justifyContent: "space-between" }}
        >
          <span
            key="home"
            style={{
              fontSize: "20px",
              padding: "0 15px",
              cursor: "default",
              marginRight: "auto",
              color: "white",
            }}
          >
            Recall Rumble
          </span>
          <Menu.Item
            key="login-signup"
            onClick={() => setShowModal(true)}
            style={{ color: "white" }}
          >
            Login/Sign Up
          </Menu.Item>
        </Menu>
      )}

      <Modal
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
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
