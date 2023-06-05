import React, { useState, useEffect } from 'react';
import { Button, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const GameLogic = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    
    useEffect(() => {
        initGame();
        fetchHighScore();
    }, []);

    const fetchHighScore = () => {
        // Simulating fetching high score from an API
        const highScoreFromAPI = 10; // Replace with actual logic to fetch high score
        setHighScore(highScoreFromAPI);
    };

    const saveHighScore = () => {
        // Simulating saving high score to an API
        const highScoreToSave = score;
        console.log('Saving high score:', highScoreToSave);
        // Replace with actual logic to save high score
    };

    const initGame = () => {
        let newCards = [];
        for (let i = 0; i < 8; i++) {
            newCards.push({ id: i, type: 'card' + i });
            newCards.push({ id: i + 8, type: 'card' + i });
        }
        newCards.sort(() => 0.5 - Math.random());
        setCards(newCards);
        setFlipped([]);
        setMatched([]);
        setScore(0);
    };

    const handleClick = (id) => {
        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            const firstCard = cards.find((card) => card.id === flipped[0]);
            const secondCard = cards.find((card) => card.id === id);

            if (firstCard.type === secondCard.type) {
                setMatched([...matched, firstCard.type]);
                setScore(score + 1);

                if (score + 1 > highScore) {
                    setHighScore(score + 1);
                    saveHighScore();
                }
            }

            setFlipped([flipped[0], id]);
        }

        if (flipped.length === 2) {
            setFlipped([id]);
        }
    };

    return (
        <div>
            <Row justify="center" align="middle" style={{ height: '150px', background: '#000', color: '#fff' }}>
                <Col>
                    <Title level={1} style={{ color: '#fff' }}>Matching Game</Title>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Col>
                    <Title level={2}>Score: {score}</Title>
                    <Title level={2}>High Score: {highScore}</Title>
                    <div>
                        {cards.map((card, index) => (
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    background: flipped.includes(card.id) || matched.includes(card.type) ? 'blue' : 'gray',
                                    display: 'inline-block',
                                    margin: '10px',
                                }}
                                key={index}
                                onClick={() => !flipped.includes(card.id) && handleClick(card.id)}
                            >
                                {flipped.includes(card.id) || matched.includes(card.type) ? card.type : ''}
                            </div>
                        ))}
                    </div>
                    <Button onClick={initGame}>Reset</Button>
                </Col>
            </Row>
        </div>
    );
};

export default GameLogic;
