import React, { useState } from 'react';
import './App.css';


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

  const [wasLastShotAFoul, setWasLastShotAFoul] = useState(false);

  const getOtherPlayerIndex = () => {
    return (playerNumber + 1) % 2;
  }

  const getOtherPlayerNumber = () => {
    return getOtherPlayerIndex() + 1;
  }

  const setOtherPlayerIndex = () => {
    setPlayerNumber(getOtherPlayerIndex());
  }

  const playAgain = () => {
    setOtherPlayerIndex();
    noFoul();
  }

  const potNothing = () => {
    noFoul();
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

  const areSnookersRequired = () => {
    return (playerPoints[1 - playerNumber] + pointsRemainingForOtherPlayer) < playerPoints[playerNumber];
  }

  const foul = (value: number) => {
    if (playerNumber === 0) {
      setPlayerPoints([playerPoints[0], playerPoints[1] + value]);
    } else {
      setPlayerPoints([playerPoints[0] + value, playerPoints[1]]);
    }

    setPlayerNumber((playerNumber + 1) % 2);
    setIsRedOn(redsRemaining > 0);

    setWasLastShotAFoul(true);
  }

  const noFoul = () => {
    setWasLastShotAFoul(false);
  }

  const potBall = (value: number) => {
    noFoul();
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
        {!isGameOver &&
          <div>
            Remaining Reds: {redsRemaining}
            <div>
              Pot
          </div>
            <div>
              {isRedOn &&
                <div>
                  <span className="ball red" onClick={() => potRed()}></span>
                  <span className="ball red" onClick={() => potRed()}></span>
                  <span className="ball red" onClick={() => potRed()}></span>
                  <span className="ball red" onClick={() => potRed()}></span>
                  <span className="ball red" onClick={() => potRed()}></span>
                  <span className="ball red" onClick={() => potRed()}></span>
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
              <span className="ball red" onClick={() => foul(4)}>4</span>
              {/* <span className="ball yellow" onClick={() => foul(4)}>X</span>
              <span className="ball green" onClick={() => foul(4)}>X</span>
              <span className="ball brown" onClick={() => foul(4)}>X</span> */}
              <span className="ball blue" onClick={() => foul(5)}>5</span>
              <span className="ball pink" onClick={() => foul(6)}>6</span>
              <span className="ball black" onClick={() => foul(7)}>7</span>
            </div>
          </div>
        }

        {isGameOver && <div>Game Over!</div>}
        <div>
          <div className="scores">
            {/* <div style={{ display: 'inline-block', padding: 5 }}>
              {playerNumber === 0 && <span>⇨ </span>}
              Player 1: <span>{playerPoints[0]}</span>
            </div>
            -
            <div style={{ display: 'inline-block', padding: 5 }}>
              <span>{playerPoints[1]}</span> : Player 2
              {playerNumber === 1 && <span> ⇦</span>}
            </div> */}
            <table style={{ border: "1" }}>
              <thead>

              </thead>
              <tbody>
                <tr>
                  <td className="player player1">Player 1</td>
                  <td style={{ width: 50, color: "yellow" }}>{<span>{playerNumber === 0 ? "⇨" : " "} </span>}</td>
                  <td><span>{playerPoints[0]}</span></td>
                  <td>-</td>
                  <td><span>{playerPoints[1]}</span></td>
                  <td style={{ width: 50, color: "yellow" }}>{<span> {playerNumber === 1 ? "⇦" : " "}</span>}</td>
                  <td className="player player2">Player 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div>
            wasLastShotAFoul = [{wasLastShotAFoul ? "Yes" : "No"}]
          </div> */}
          <div style={{ marginTop: 15 }}>
            {/* Current Player: <span>{playerNumber + 1}</span> */}
            {areSnookersRequired() && <div style={{ backgroundColor: "orange" }}>Player {(playerNumber + 1) % 2 === 0 ? 1 : 2} : Snookers Required!!!!</div>}
          </div>
          {wasLastShotAFoul && <div><button onClickCapture={playAgain}>Player {getOtherPlayerNumber()} Play Again</button></div>}
          <div>
            Points Remaining: <span>{pointsRemaining}</span>
          </div>
          <div>
            Points Remaining For Player {(playerNumber + 1) % 2 === 0 ? 1 : 2}: <span>{pointsRemainingForOtherPlayer}</span>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
