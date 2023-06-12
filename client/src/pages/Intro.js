import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Button, Modal, Tabs } from "antd";
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const { Title } = Typography;
const { TabPane } = Tabs;

const Intro = () => {
  const [showModal, setShowModal] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row justify="center" className="bg" align="middle" style={{ minHeight: windowHeight, color: "#fff", textAlign: "center" }}>
        <Col>
          <Title level={1} className="pageheader" style={{ color: "#fff", textAlign: "center", width: "auto", marginLeft:'10px', marginRight: '10px', marginTop:'10px' }}>
            {Auth.loggedIn() ? "Now that you have an account," : "Hey there, welcome to Recall Rumble!"}
          </Title>
          <img src={logo} alt="Logo" className="logo" style={{ width: "45%", maxWidth: "300px", marginTop:'10px', marginBottom:'20px', marginLeft: 'auto', marginRight: 'auto' }} />
          <Title level={1} className="pageheader" style={{ color: "#fff", textAlign: "center", width: "auto", marginLeft:'15px', marginRight: '15px' }}>
            {Auth.loggedIn() ? "Press the button below to play!" : "Click the button below to login or to make an account!"}
          </Title>
          {Auth.loggedIn() ? (
            <Link to="/Game">
              <Button className="pageheader" size="large" type="primary" style={{ justifyContent: "center", marginTop: "1rem" }}>
                Recall Rumble Time!
              </Button>
            </Link>
          ) : (
            <Button className="pageheader" size="large" type="primary" onClick={() => setShowModal(true)} style={{ justifyContent: "center", marginTop: "1rem", marginBottom:'10px' }}>
              Login / Sign Up
            </Button>
          )}
        </Col>
      </Row>
      <Modal centered open={showModal} onCancel={handleModalClose} footer={null}>
        <Tabs defaultActiveKey="login" centered>
          <TabPane tab="Login" key="login">
            <LoginForm handleModalClose={handleModalClose} />
          </TabPane>
          <TabPane tab="Sign Up" key="signup">
            <SignUpForm handleModalClose={handleModalClose} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default Intro;
