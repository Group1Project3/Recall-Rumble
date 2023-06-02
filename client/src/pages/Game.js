import React from 'react';
import { Typography, Layout, Row, Col } from 'antd';
import Cards from '../components/cards/Cards';

const { Content } = Layout;
const { Title } = Typography;

const GamePage = () => {
  return (
    <Layout>
       <Row justify="center" align="middle" style={{ height: '100px', background: '#000', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff' }}>Recall Rumble</Title>
        </Col>
      </Row>
      <Content style={{ padding: '15px' }}>
        <Cards />
      </Content>
    </Layout>
  );
};

export default GamePage;
