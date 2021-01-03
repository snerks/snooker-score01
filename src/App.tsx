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
  const [wasGameConceded, setWasGameConceded] = useState(false);

  const [wasLastShotAFoul, setWasLastShotAFoul] = useState(false);

  const getWinningPlayer = () => {
    return playerPoints[0] > playerPoints[1] ? "1" : "2";
  }

  const newGame = () => {
    setRedsRemaining(15);
    setPointsRemaining(147);
    setPointsRemainingForOtherPlayer(147);

    setPlayerPoints([0, 0]);
    setPlayerNumber(0);

    setIsFinalRedColourGone(false);

    setIsRedOn(true);

    setIsYellowOn(true);
    setIsGreenOn(true);
    setIsBrownOn(true);
    setIsBlueOn(true);
    setIsPinkOn(true);
    setIsBlackOn(true);

    setWasLastShotAFoul(false);

    setIsGameOver(false);
  }

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

  const concede = () => {
    setIsGameOver(true);
    setWasGameConceded(true);
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

  interface SnookersRequiredInfo {
    isSnookersRequiredTargetPossible: boolean;

    targetValue: number;
    redCount: number;
    blackCount: number;

    isYellowRequired: boolean;
    isGreenRequired: boolean;
    isBrownRequired: boolean;
    isBlueRequired: boolean;
    isPinkRequired: boolean;
    isBlackRequired: boolean;
  }

  const getSnookersRequiredTarget = (): SnookersRequiredInfo => {
    const currentPlayerScore = playerPoints[playerNumber];
    const otherPlayerScore = playerPoints[1 - playerNumber];

    if (currentPlayerScore + pointsRemaining < otherPlayerScore) {
      return {
        isSnookersRequiredTargetPossible: false,

        targetValue: otherPlayerScore + 1,
        redCount: redsRemaining,
        blackCount: redsRemaining,

        isBlackRequired: true,
        isBlueRequired: true,
        isBrownRequired: true,
        isGreenRequired: true,
        isPinkRequired: true,
        isYellowRequired: true
      };
    }

    if (currentPlayerScore > pointsRemainingForOtherPlayer + otherPlayerScore) {
      return {
        isSnookersRequiredTargetPossible: true,

        targetValue: pointsRemainingForOtherPlayer + otherPlayerScore + 1,
        redCount: 0,
        blackCount: 0,

        isBlackRequired: false,
        isBlueRequired: false,
        isBrownRequired: false,
        isGreenRequired: false,
        isPinkRequired: false,
        isYellowRequired: false
      };
    }

    let runningTotal = 0;

    const remainingRedsCount = redsRemaining;

    let remainingPointsForOtherPlayer = pointsRemainingForOtherPlayer;

    let currentPlayerRunningTotal = currentPlayerScore;

    for (let index = 0; index < remainingRedsCount; index++) {
      remainingPointsForOtherPlayer -= 8;

      runningTotal++;

      currentPlayerRunningTotal = currentPlayerScore + runningTotal;

      if (currentPlayerRunningTotal > remainingPointsForOtherPlayer + otherPlayerScore) {
        return {
          isSnookersRequiredTargetPossible: true,

          targetValue: currentPlayerRunningTotal,
          redCount: index + 1,
          blackCount: index,

          isBlackRequired: false,
          isBlueRequired: false,
          isBrownRequired: false,
          isGreenRequired: false,
          isPinkRequired: false,
          isYellowRequired: false
        };
      }

      runningTotal += 7;

      currentPlayerRunningTotal = currentPlayerScore + runningTotal;

      if (currentPlayerRunningTotal > remainingPointsForOtherPlayer + otherPlayerScore) {
        return {
          isSnookersRequiredTargetPossible: true,

          targetValue: currentPlayerRunningTotal,
          redCount: index + 1,
          blackCount: index + 1,

          isBlackRequired: false,
          isBlueRequired: false,
          isBrownRequired: false,
          isGreenRequired: false,
          isPinkRequired: false,
          isYellowRequired: false
        };
      }
    }

    for (let index = 2; index < 8; index++) {
      remainingPointsForOtherPlayer -= index;

      runningTotal += index;

      currentPlayerRunningTotal = currentPlayerScore + runningTotal;

      if (currentPlayerRunningTotal > remainingPointsForOtherPlayer + otherPlayerScore) {
        return {
          isSnookersRequiredTargetPossible: true,

          targetValue: currentPlayerRunningTotal,
          redCount: remainingRedsCount,
          blackCount: remainingRedsCount,

          isYellowRequired: index >= 2,
          isGreenRequired: index >= 3,
          isBrownRequired: index >= 4,
          isBlueRequired: index >= 5,
          isPinkRequired: index >= 6,
          isBlackRequired: index >= 7,
        };
      }
    }

    return {
      isSnookersRequiredTargetPossible: false,

      targetValue: remainingPointsForOtherPlayer + otherPlayerScore,
      redCount: remainingRedsCount,
      blackCount: remainingRedsCount,

      isYellowRequired: true,
      isGreenRequired: true,
      isBrownRequired: true,
      isBlueRequired: true,
      isPinkRequired: true,
      isBlackRequired: true,
    };
  }

  const areSnookersRequiredForOtherPlayer = () => {
    return (playerPoints[1 - playerNumber] + pointsRemainingForOtherPlayer) < playerPoints[playerNumber];
  }

  const areSnookersRequiredForCurrentPlayer = () => {
    return (playerPoints[playerNumber] + pointsRemaining) < playerPoints[1 - playerNumber];
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

    if (isFinalRedColourGone) {
      setPointsRemaining(pointsRemaining - value);
    } else {
      setPointsRemaining(pointsRemaining - (value === 1 ? 1 : 7));
    }

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
            {/* Remaining Reds: {redsRemaining} */}
            <div>
              Pot {isRedOn ? "Red" : "Colour"} {isRedOn && redsRemaining > 0 ? "(" + redsRemaining + " remaining)" : null}
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

        {isGameOver &&
          <div>Frame Over!
            {wasGameConceded && " Frame conceded by Player " + (playerNumber + 1)}
            {!wasGameConceded && " Frame won by Player " + getWinningPlayer()}
          </div>}
        <div>
          <div className="scores">
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

          {getSnookersRequiredTarget().isSnookersRequiredTargetPossible &&
            <>
              <div>
                Snookers Required Target : {getSnookersRequiredTarget().targetValue}
              </div>
              <div>
                {getSnookersRequiredTarget().redCount > 0 &&
                  <div>
                    <span className="ball red">{getSnookersRequiredTarget().redCount}</span>
                    <span className="ball black">{getSnookersRequiredTarget().blackCount}</span>
                  </div>
                }
                <div>
                  {getSnookersRequiredTarget().isYellowRequired && <span className="ball yellow"></span>}
                  {getSnookersRequiredTarget().isGreenRequired && <span className="ball green"></span>}
                  {getSnookersRequiredTarget().isBrownRequired && <span className="ball brown"></span>}
                  {getSnookersRequiredTarget().isBlueRequired && <span className="ball blue"></span>}
                  {getSnookersRequiredTarget().isPinkRequired && <span className="ball pink"></span>}
                  {getSnookersRequiredTarget().isBlackRequired && <span className="ball black"></span>}
                </div>
              </div>
            </>
          }

          {/* <div>
            Snookers Required Target JSON:
            <pre style={{ fontSize: 14 }}>{JSON.stringify(getSnookersRequiredTarget(), null, 2)}</pre>
          </div> */}

          {!isGameOver &&
            <div style={{ marginTop: 15 }}>
              {areSnookersRequiredForOtherPlayer() && <div style={{ backgroundColor: "orange", paddingTop: 10, paddingBottom: 10 }}>Player {(playerNumber + 1) % 2 === 0 ? 1 : 2} : Snookers Required!!!!</div>}
              {areSnookersRequiredForCurrentPlayer() && <div><button className="negative" onClickCapture={concede}>Player {(playerNumber) % 2 === 0 ? 1 : 2} Concedes</button></div>}
            </div>
          }
          {!isGameOver && wasLastShotAFoul && <div><button className="negative" onClickCapture={playAgain}>Player {getOtherPlayerNumber()} Play Again</button></div>}
          {!isGameOver &&
            <>
              <div>
                Points Remaining for Current Player: <span>{pointsRemaining}</span>
              </div>
              <div>
                Points Remaining For Player {(playerNumber + 1) % 2 === 0 ? 1 : 2}: <span>{pointsRemainingForOtherPlayer}</span>
              </div>
            </>
          }
          {isGameOver && <div><button className="positive" onClickCapture={newGame}>New Frame</button></div>}
        </div>
      </header>
    </div>
  );
}

export default App;
