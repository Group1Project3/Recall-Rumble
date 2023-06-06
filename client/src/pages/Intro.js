import React, { useState } from "react";
import { Typography, Row, Col, Button, Modal, Tabs } from "antd";
import SignUpForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
// import logo from "../images/logo.png";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { TabPane } = Tabs;

const Intro = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row justify="center" className='bg' align="middle" style={{ height: '100vh', color: '#fff', textAlign: 'center' }}>
        <Col>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center', width: '80vw' }}>
            {Auth.loggedIn() ? "Now that you have an account," : "Hey there, welcome to Recall Rumble!"}
          </Title>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center', width: '80vw' }}>
            {Auth.loggedIn() ? "Press the button below to play!" : "Click the button below to login or to make an account!"}
          </Title>
          {Auth.loggedIn() ? (
            <Link to="/Game">
              <Button className='pageheader' size="large" type="primary" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                Recall Rumble Time!
              </Button>
            </Link>
          ) : (
            <Button className='pageheader' size="large" type="primary" onClick={() => setShowModal(true)} style={{ justifyContent: 'center', marginTop: '1rem' }}>
              Login / Sign Up
            </Button>
            
          )}
        </Col>
      </Row>
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

export default Intro;
// // import React from 'react';
// import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';

// const items: MenuProps['items'] = [
//   {
//     key: '1',
//     type: 'group',
//     label: 'Group title',
//     children: [
//       {
//         key: '1-1',
//         label: '1st menu item',
//       },
//       {
//         key: '1-2',
//         label: '2nd menu item',
//       },
//     ],
//   },
//   {
//     key: '2',
//     label: 'sub menu',
//     children: [
//       {
//         key: '2-1',
//         label: '3rd menu item',
//       },
//       {
//         key: '2-2',
//         label: '4th menu item',
//       },
//     ],
//   },
//   {
//     key: '3',
//     label: 'disabled sub menu',
//     disabled: true,
//     children: [
//       {
//         key: '3-1',
//         label: '5d menu item',
//       },
//       {
//         key: '3-2',
//         label: '6th menu item',
//       },
//     ],
//   },
// ];

// const App: React.FC = () => (
//   <Dropdown menu={{ items }}>
//     <a onClick={(e) => e.preventDefault()}>
//       <Space>
//         Cascading menu
//         <DownOutlined />
//       </Space>
//     </a>
//   </Dropdown>
// );

// export default App;
