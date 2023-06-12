import React from "react";
import { Typography, Layout, Row, Col } from "antd";
import Cards from "../components/cards/Cards";

const { Content } = Layout;
const { Title } = Typography;

const GamePage = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} className='pageheaderGame' style={{ color: '#fff', textAlign: 'center', marginLeft:'10px', marginRight: '10px' }}>Match the cards in as few turns as possible!</Title>
        </Col>
      </Row>
      <Content style={{ padding: "15px" }}>
       
        <Cards
          currentLevel={window.location.pathname.split("/").at(-1)}
         // timeLeft={timeLeft}
        />
      </Content>
    </Layout>
  );
};

export default GamePage;
