import React from 'react';
// eslint-disable-next-line no-unused-vars
import GameLogic from '../components/GameLogic';
import Cards from '../components/cards/Cards';
import { Layout } from 'antd';

const { Content } = Layout;

const GamePage = () => {
  return (
    <Layout>
       <Content style={{ padding: '15px' }}>
        <Cards />
      </Content>
    </Layout>
  );
};

export default GamePage;
