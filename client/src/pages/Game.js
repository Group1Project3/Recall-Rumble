import React from 'react';
import { Typography, Layout, Row, Col } from 'antd';
import Cards from '../components/cards/Cards';
import GameLogic from '../components/GameLogic';
import { Layout } from 'antd';
import Card from '../components/cards/Cards';
import CardItem from '../components/cards/CardItem'

const { Content } = Layout;
const { Title } = Typography;

const GamePage = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#000', color: '#fff' }}>
        <Col>
          <Title level={1} style={{ color: '#fff', textAlign: 'center' }}>Match the cards in as few turns as possible!</Title>
        </Col>
      </Row>
      <Content style={{ padding: '15px' }}>
        <Cards />
      </Content>
    </Layout>
  );
};

export default GamePage;
