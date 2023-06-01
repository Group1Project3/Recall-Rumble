import React from 'react';
import GameLogic from '../components/GameLogic';
import { Typography, Layout } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const GamePage = () => {
  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Title level={2}>Game Page</Title>
        <GameLogic />
      </Content>
    </Layout>
  );
};

export default GamePage;
