import React from "react";
import { Typography, Layout, Row, Col } from "antd";
import Cards from "../components/cards/Cards";

const { Content } = Layout;
const { Title } = Typography;

// const App: React.FC = () => (
//   <Row gutter={16}>
//     <Col span={12}>
//       <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
//     </Col>
//     <Col span={12}>
//       <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
//     </Col>
//     <Col span={24} style={{ marginTop: 32 }}>
//       <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
//     </Col>
//     <Col span={12}>
//       <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
//     </Col>
//   </Row>
// );

const GamePage = () => {
  

  // const[timeLeft, setTimeLeft] = useState(null);
  // const onChange = (val)=>{
  //   setTimeLeft(val)
  // }

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
        <Col>
          <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center' }}>Match the cards in as few turns as possible!</Title>
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
