import React, { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { Row, Col} from "antd";// removed statistic
import { useNavigate } from "react-router-dom";

//change it to 45 sec
// const deadline = Date.now() + 1000 * 45; // Dayjs is also OK
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

  useEffect(() => {
    // declare number of cards based on level
    let number;
    switch (currentLevel) {
      case "beginner":
        number = 6;
        break;
      case "intermediate":
        number = 12;
        break;
      case "expert":
        number = 18;
        break;
      default:
        number = 8;
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
  switch (currentLevel) {
    // easy
    case "beginner":
      source = "?set=set1";
      break;
    // hard
    case "expert":
      source = "?set=set4";
      break;
    // medium
    case "intermediate":
      source = "?set=set2";
      break;
    default:
      source = "?set=set1";
  }

  // handle cards clicked
  const cardClicked = (cardDiv) => {
    // delcare imgId and div id
    curImgId = parseInt(cardDiv.getAttribute("imgid"));
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
          // store number of moves, pass game object to updateNewGame function
          // updateNumOfMoves(count);
          // setTimeout(() => {
          //   updateNewGame({
          //     gameLevel: currentLevel,
          //     numOfMoves: count,
          //     date: Date.now(),
          //   });
          //   updateActive();
          // }, 1000);

          //This is the final score
          // const score = ((deadline - Date.now()) / 1000).toPrecision(2);

          //create a query to store the score into the database through which leaderboard will be populated
          navigate("/Leaderboard");
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
    console.log("nope!");
  };

  const navigate = useNavigate();
  const onFinish = () => {
    navigate("/Leaderboard");
  };

  return (
    <>
      {/* <Statistic.Countdown
        title="Time Left"
        style={{
          textAlign: "end",
          marginBottom: "20px",
          marginRight: "20px",
          fontSize: "20px",
        }}
        value={deadline}
        onFinish={onFinish}
      /> */}
      <Row gutter={[16, 16]} style={{ margin: "16px" }}>
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
    </>
  );
};

export default Cards;
