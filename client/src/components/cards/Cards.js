import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { useQuery, useMutation } from '@apollo/client';
import { CHECK_HS, GET_ME } from '../../utils/queries';
import { SAVE_SCORE, UPDATE_OLD_HIGH, UPDATE_PLAYER_HIGH, LAST_SCORE } from '../../utils/mutations';
import { Row, Col, Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Cards = ({
  updateActive,
  updateNumOfMoves,
  currentLevel,
  currentTheme,
  updateNewGame,
}) => {
  const [images, setImages] = useState([]);
  const [shownCards, setShownCards] = useState([]);
  const [currCards, setCurrCards] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [count, setCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [saveScore] = useMutation(SAVE_SCORE);
  const [updateOldHigh] = useMutation(UPDATE_OLD_HIGH);
  const [updatePlayerHigh] = useMutation(UPDATE_PLAYER_HIGH);
  const [lastScore] = useMutation(LAST_SCORE);

  const checkHS = useQuery(CHECK_HS);
  const getMe = useQuery(GET_ME);

  const hsData = checkHS.data?.checkHighScore;
  const userData = getMe.data?.me || {};

  const navigate = useNavigate();

  useEffect(() => {
    let number;
    switch (currentLevel) {
      case 'beginner':
        number = 12;
        break;
      case 'intermediate':
        number = 20;
        break;
      case 'expert':
        number = 30;
        break;
      default:
        number = 12;
    }

    let buffer = [];
    for (let i = 1; i <= number; i++) {
      let temp;
      if (i <= number / 2) {
        temp = i;
      } else {
        temp = i - number / 2;
      }
      buffer.push({ id: temp });
    }

    buffer.sort(() => {
      return 0.5 - Math.random();
    });

    setImages(buffer);
  }, [currentLevel]);

  let curId = 0;
  let curImgId = 0;

  let source;
  switch (currentTheme) {
    case 'robots':
      source = '?set=set1';
      break;
    case 'cats':
      source = '?set=set4';
      break;
    case 'monsters':
      source = '?set=set2';
      break;
    default:
      source = '?set=set1';
  }

  const cardClicked = async (cardDiv) => {
    curImgId = parseInt(cardDiv.getAttribute('imgid'));
    curId = parseInt(cardDiv.id);
    if (currCards.length === 0) {
      setCurrCards((currCards) => [...currCards, curImgId]);
      setShownCards((shownCards) => [...shownCards, curId]);
    } else {
      setCount(count + 1);
      if (currCards.includes(curImgId)) {
        setShownCards((shownCards) => [...shownCards, curId]);
        setCurrCards([]);
        if (shownCards.length === images.length - 1) {
          handleScoreSave(count, await CheckHighScore(count), userData._id);
          showModal();
        }
      } else {
        setDisableClick(true);
        setShownCards((shownCards) => [...shownCards, curId]);
        setCurrCards([]);
        setTimeout(() => {
          let shownCardsTempArr = [...shownCards];
          shownCardsTempArr.splice(-1, 1);
          setShownCards(shownCardsTempArr);
          setDisableClick(false);
        }, 500);
      }
    }
  };

  const noClicking = () => {
    console.log('nope!');
  };

  const handleScoreSave = async (value, highScore, player) => {
    try {
      await saveScore({
        variables: {
          value: value,
          highScore: highScore,
          player: player
        }
      });
      await lastScore({
        variables: {
          _id: userData._id,
          lastScore: value
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const CheckHighScore = async (score) => {
    if (hsData !== null) {
      if (score < hsData.value) {
        try {
          await updateOldHigh({
            variables: {
              player: userData._id,
            }
          });
          await updatePlayerHigh({
            variables: {
              _id: userData._id,
              highScore: score
            }
          });
          return true;
        } catch (err) {
          console.error(err);
        }
      } else {
        return false;
      }
    } else {
      try {
        await updatePlayerHigh({
          variables: {
            _id: userData._id,
            highScore: score
          }
        });
        return true;
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/Leaderboard');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: '16px', marginBottom: '16px', marginLeft: '16px', marginRight: '16px' }}>
        {images.map((image, index) => (
          <Col key={index} xs={8} sm={8} md={8} lg={8} xl={6} xxl={4}>
            <CardItem
              id={index}
              imageId={image.id}
              shownCards={shownCards}
              cardClicked={disableClick ? noClicking : cardClicked}
              source={source}
            />
          </Col>
        ))}
      </Row>
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            Game Completed!
          </div>
        }
        open={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ textAlign: 'center' }}>
          <p>Score: {count-1}</p>
          <Button type="primary" block style={{ marginTop: '10px' }} onClick={handleOk}>Leaderboard</Button>
          <Button type="primary" block style={{ marginTop: '10px' }} onClick={handleCancel}>Play Again</Button>
        </div>
      </Modal>
    </>
  );
};

export default Cards;