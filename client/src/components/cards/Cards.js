import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { useQuery, useMutation } from '@apollo/client';
import { CHECK_HS, CHECK_GLOBAL, GET_ME} from '../../utils/queries';
import { SAVE_SCORE, UPDATE_HIGH, UPDATE_GLOBAL } from '../../utils/mutations';
import { Row, Col } from 'antd';

// declare props and initial state
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
  // eslint-disable-next-line no-unused-vars
  const [saveScore, { error }] = useMutation(SAVE_SCORE);
  // eslint-disable-next-line no-unused-vars
  const [updateOldHigh, { error2 }] = useMutation(UPDATE_HIGH);
  // eslint-disable-next-line no-unused-vars
  const [updateOldGlobal, { error3 }] = useMutation(UPDATE_GLOBAL);

  const checkHS = useQuery(CHECK_HS);
  const checkGlobal = useQuery(CHECK_GLOBAL);
  const getMe = useQuery(GET_ME);

  const hsData = checkHS.data?.checkHighScore;
  const globalData = checkGlobal.data?.checkGlobalHigh;
  const userData = getMe.data?.me || {};

  console.log(userData)
  console.log(hsData)
  console.log(globalData)

  useEffect(() => {
    // declare number of cards based on level
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

    // declare array with integers up to 'number', repeated once, and then randomize
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

    buffer.sort((a, b) => {
      return 0.5 - Math.random();
    });

    // save random int array to state
    setImages(buffer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // declare variables
  let curId = 0;
  let curImgId = 0;

  // declare source based on user's chosen theme for robohash api
  let source;
  switch (currentTheme) {
    // easy
    case 'robots':
      source = '?set=set1';
      break;
      // hard
    case 'cats':
      source = '?set=set4';
      break;
      // medium
    case 'monsters':
      source = '?set=set2';
      break;
    default:
      source = '?set=set1';
  }

  // handle cards clicked
  const cardClicked = async (cardDiv) => {
    // delcare imgId and div id
    curImgId = parseInt(cardDiv.getAttribute('imgid'));
    curId = parseInt(cardDiv.id);
    // if card is first clicked in pair, store values
    if (currCards.length === 0) {
      setCurrCards((currCards) => [...currCards, curImgId]);
      setShownCards((shownCards) => [...shownCards, curId]);
      // runs if card second clicked in pair
    } else {
      // increase count state by 1
      setCount(count + 1);
      // if cards match, store second card and clear currCards state
      if (currCards.includes(curImgId)) {
        setShownCards((shownCards) => [...shownCards, curId]);
        setCurrCards([]);
        // runs if all cards found
        if (shownCards.length === images.length - 1) {
          // Save score to db
          handleScoreSave(count, CheckHighScore(count), CheckGlobalHigh(count), userData._id) 
        }
        // runs if second card does not match firs card
      } else {
        // disable click, show second card, clear current cards
        setDisableClick(true);
        setShownCards((shownCards) => [...shownCards, curId]);
        setCurrCards([]);
        // after half a second, flip last two cards back over and enable clicking
        setTimeout(() => {
          let shownCardsTempArr = [...shownCards];
          shownCardsTempArr.splice(-1, 1);
          setShownCards(shownCardsTempArr);
          setDisableClick(false);
        }, 500);
      }
    }
  };

  // log message if shown card clicked
  const noClicking = () => {
    console.log('nope!');
  };

  const handleScoreSave = async (value, highScore, globalHigh, player) => {
    try { 
      await saveScore({
        variables: { 
            value: value,
            highScore: highScore,
            globalHigh: globalHigh,
            player: player
         }
      });
      console.log('score saved')
    } catch (err) {
      console.error(JSON.stringify(err))
    }
  }

  const CheckHighScore = (score) => {
    let newScoreHigh = true
    
    if ( hsData != null && globalData != null) {
      if (score < hsData.value) {
        newScoreHigh = true
      } else {
        newScoreHigh = false
      }
    }
    return newScoreHigh
  }

  const CheckGlobalHigh = (score) => {
    let newScoreGlobal = true

    if ( hsData != null && globalData != null) {
      if (score < globalData.value) {
          newScoreGlobal = true
        } else {
          newScoreGlobal = false
        }
      }
    return newScoreGlobal
  }

  return (
    <Row gutter={[16, 16]} style={{ marginTop: '16px', marginBottom: '16px', marginLeft: '16px', marginRight: '16px' }}>
      {images.map((image, index) => (
        <Col key={index} xs={12} sm={8} md={8} lg={8} xl={6} xxl={4}>
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
  );
};

export default Cards;