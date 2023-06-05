import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const CancelledOrderPage = () => {
    return (
        <>
            <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
                <Col>
                    <Title className='pageheader' level={1} style={{ color: '#fff', textAlign: 'center' }}>Looks like the order was cancelled</Title>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '25px' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Title className='donation' level={2}>Would you like to retry?</Title>
                    <Link to="/Donate">
                        <Button className='donation' type="primary" size="large" style={{ justifyContent: 'center', marginTop: '5px' }}>
                            Take me back!
                        </Button>
                    </Link>

                </Col>
            </Row>

        </>
    );
};

export default CancelledOrderPage;
