import React from 'react';
import { Typography, Layout, Row, Col } from 'antd';
import Cards from '../components/cards/Cards';

const { Content } = Layout;
const { Title } = Typography;

const GamePage = (props) => {
  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#000', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>Match the cards in as few turns as possible!</Title>
        </Col>
      </Row>
      <Content style={{ padding: '15px' }}>
        <Cards currentTheme={"monsters"} currentLevel={window.location.pathname.split("/").at(-1)}/>
      </Content>
    </Layout>
  );
};

export default GamePage;
