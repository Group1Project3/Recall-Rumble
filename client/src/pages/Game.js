import React from 'react';
import GameLogic from '../components/GameLogic';

import { Layout } from 'antd';

const { Content } = Layout;

const GamePage = () => {
  return (
    <Layout>
      <Content >
        <GameLogic />
      </Content>
    </Layout>
  );
};

export default GamePage;
