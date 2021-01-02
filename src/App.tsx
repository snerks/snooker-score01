import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// interface IPlayerPointsState {
//   0: number;
//   1: number;
// }

const App = () => {
  const [redsRemaining, setRedsRemaining] = useState(15);

  const [pointsRemaining, setPointsRemaining] = useState(147);
  const [pointsRemainingForOtherPlayer, setPointsRemainingForOtherPlayer] = useState(147);

  const [playerPoints, setPlayerPoints] = useState([0, 0]);
  const [playerNumber, setPlayerNumber] = useState(0);

  const [isFinalRedColourGone, setIsFinalRedColourGone] = useState(false);

  const [isRedOn, setIsRedOn] = useState(true);
  const [isYellowOn, setIsYellowOn] = useState(true);
  const [isGreenOn, setIsGreenOn] = useState(true);
  const [isBrownOn, setIsBrownOn] = useState(true);
  const [isBlueOn, setIsBlueOn] = useState(true);
  const [isPinkOn, setIsPinkOn] = useState(true);
  const [isBlackOn, setIsBlackOn] = useState(true);

  const [isGameOver, setIsGameOver] = useState(false);

  const potNothing = () => {
    setPlayerNumber((playerNumber + 1) % 2);
    setIsRedOn(redsRemaining > 0);
    setPointsRemaining((redsRemaining * 8) + 27);

    if (redsRemaining === 0) {
      setIsFinalRedColourGone(true);
      setIsYellowOn(true);
      setIsGreenOn(false);
      setIsBrownOn(false);
      setIsBlueOn(false);
      setIsPinkOn(false);
      setIsBlackOn(false);
    }
  }

  const potRed = () => {
    potBall(1);
    setRedsRemaining(redsRemaining - 1);

    setPointsRemainingForOtherPlayer(pointsRemainingForOtherPlayer - 8);
  }

  const potYellow = () => {
    potBall(2);
  }

  const potGreen = () => {
    potBall(3);
  }

  const potBrown = () => {
    potBall(4);
  }

  const potBlue = () => {
    potBall(5);
  }

  const potPink = () => {
    potBall(6);
  }

  const potBlack = () => {
    potBall(7);

    if (isFinalRedColourGone) {
      setIsGameOver(true);
    }
  }

  // public get areSnookersRequired() {
  //   return pointsRemainingForOtherPlayer < playerPoints[playerNumber];
  // }

  const areSnookersRequired = () => {
    return pointsRemainingForOtherPlayer < playerPoints[playerNumber];
  }

  const potBall = (value: number) => {
    setPointsRemaining(pointsRemaining - value);

    if (playerNumber === 0) {
      setPlayerPoints([playerPoints[0] + value, playerPoints[1]]);
    } else {
      setPlayerPoints([playerPoints[0], playerPoints[1] + value]);
    }

    setIsRedOn(redsRemaining > 0 && value > 1);

    if (redsRemaining === 0 && value > 1) {
      setIsFinalRedColourGone(true);
      setIsYellowOn(true);
      setIsGreenOn(false);
      setIsBrownOn(false);
      setIsBlueOn(false);
      setIsPinkOn(false);
      setIsBlackOn(false);
    }

    if (isFinalRedColourGone) {
      setPointsRemainingForOtherPlayer(pointsRemainingForOtherPlayer - value);

      switch (value) {
        case 2:
          setIsYellowOn(false);
          setIsGreenOn(true);
          setIsBrownOn(false);
          setIsBlueOn(false);
          setIsPinkOn(false);
          setIsBlackOn(false);
          break;
        case 3:
          setIsYellowOn(false);
          setIsGreenOn(false);
          setIsBrownOn(true);
          setIsBlueOn(false);
          setIsPinkOn(false);
          setIsBlackOn(false);
          break;
        case 4:
          setIsYellowOn(false);
          setIsGreenOn(false);
          setIsBrownOn(false);
          setIsBlueOn(true);
          setIsPinkOn(false);
          setIsBlackOn(false);
          break;
        case 5:
          setIsYellowOn(false);
          setIsGreenOn(false);
          setIsBrownOn(false);
          setIsBlueOn(false);
          setIsPinkOn(true);
          setIsBlackOn(false);
          break;
        case 6:
          setIsYellowOn(false);
          setIsGreenOn(false);
          setIsBrownOn(false);
          setIsBlueOn(false);
          setIsPinkOn(false);
          setIsBlackOn(true);
          break;
        case 7:
          setIsYellowOn(false);
          setIsGreenOn(false);
          setIsBrownOn(false);
          setIsBlueOn(false);
          setIsPinkOn(false);
          setIsBlackOn(false);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {!isGameOver &&
          <div>
            Remaining Reds: {redsRemaining}
            <div>
              Pot
          </div>
            <div>
              {/* <span className="ball">Pot</span> */}
              {isRedOn &&
                <div>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                  <span className="ball red" onClick={() => potRed()}>{redsRemaining}</span>
                </div>
              }
              {!isRedOn &&
                <div>
                  {isYellowOn && <span className="ball yellow" onClick={() => potYellow()}></span>}
                  {isGreenOn && <span className="ball green" onClick={() => potGreen()}></span>}
                  {isBrownOn && <span className="ball brown" onClick={() => potBrown()}></span>}
                  {isBlueOn && <span className="ball blue" onClick={() => potBlue()}></span>}
                  {isPinkOn && <span className="ball pink" onClick={() => potPink()}></span>}
                  {isBlackOn && <span className="ball black" onClick={() => potBlack()}></span>}
                </div>
              }
            </div>
            <div>
              No Pot
          </div>
            <div>
              <span className="ball white" onClick={() => potNothing()}></span>
            </div>
            <div>
              Foul
          </div>
            <div>
              <span className="ball red" onClick={() => potRed()}>X</span>
              <span className="ball yellow" onClick={() => potYellow()}>X</span>
              <span className="ball green">X</span>
              <span className="ball brown">X</span>
              <span className="ball blue">X</span>
              <span className="ball pink">X</span>
              <span className="ball black">X</span>
            </div>
          </div>
        }

        {isGameOver && <div>Game Over!</div>}
        <div>
          <div>
            Current Player: <span>{playerNumber + 1}</span>

            {/* <div>
              PointsRemainingForOtherPlayer: {pointsRemainingForOtherPlayer}
            </div>
            <div>
              PlayerPoints[{playerNumber}]: {playerPoints[playerNumber]}
            </div> */}
            {areSnookersRequired() && <div style={{ backgroundColor: "orange" }}>Player {(playerNumber + 1) % 2 === 0 ? 1 : 2} : Snookers Required!!!!</div>}
          </div>
          <div>
            Points Remaining: <span>{pointsRemaining}</span>
          </div>
          <div>
            Points Remaining For Player {(playerNumber + 1) % 2 === 0 ? 1 : 2}: <span>{pointsRemainingForOtherPlayer}</span>
          </div>
          <div>
            Player 1: <span>{playerPoints[0]}</span>
          </div>
          <div>
            Player 2: <span>{playerPoints[1]}</span>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
