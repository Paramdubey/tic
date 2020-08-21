import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import Square from "./Square";
import "./App.css";
import { WinningLogic } from "./Helper";
import Countdown from "react-countdown";
function App() {
  const [showText, setShowText] = useState(false);

  const handleStart = () => {
    setShowSquare(true);
    setCurrentButton(resetButton);
  };
  const handleReset = () => {
    setShowSquare(false);
    setFirstName(null);
    setLastName(null);
    setCurrentButton(startButton);
    setSquare(Array(9).fill(null));
    setTimeValue(0);
    console.log(document.getElementById("firstName"));
    document.getElementById("firstName").innerText = "";
  };

  const startButton = (
    <Button type="primary" disabled={false} onClick={handleStart}>
      Start
    </Button>
  );
  const resetButton = (
    <Button danger type="primary" onClick={handleReset}>
      Reset
    </Button>
  );
  const [currentButton, setCurrentButton] = useState(startButton);
  const [timeValue, setTimeValue] = useState(null);
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [showSquare, setShowSquare] = useState(false);
  const [turn, setTurn] = useState(null);

  console.log("popp23", timeValue);

  let winningInfo = WinningLogic(squares);
  let winner = winningInfo.winner;

  // const Completionist = (props) => {
  //   console.log(props, "poppa", timeValue);
  //   if (isXNext === true && timeValue === 1000) {
  //     return <span style={{ fontSize: "22px" }}>{firstName}&nbsp;wins</span>;
  //   } else if (isXNext === false && timeValue === 1000) {
  //     return <span style={{ fontSize: "22px" }}>{lastName}&nbsp;wins</span>;
  //   } else {
  //     return <span style={{ fontSize: "22px" }}>Ready</span>;
  //   }
  // };
  const winnerHighlight = winningInfo.line;
  let status;
  if (winner) {
    status = "Winner is" + winner;
  } else if (winningInfo.isDraw) {
    status = "It's a Draw";
  } else {
    status = "Next Player is " + (isXNext ? firstName : lastName);
  }

  //var myVar, var2;

  // function myStopFunction() {
  //   console.log("stop called");
  //   setTimeValue(0);
  //   clearInterval(var2);
  //   clearTimeout(myVar);
  // }
  // function myFunction(isXNext) {
  //   let i = 5;
  //   var2 = setInterval(() => {
  //     i = i - 1;
  //     console.log("timevalue", i);
  //     setTimeValue(i);
  //   }, 1000);
  //   console.log("nest", isXNext);
  //   myVar = setTimeout(() => {
  //     clearInterval(var2);
  //     clearTimeout(myVar);
  //     console.log("nest 2", isXNext);
  //     const name = isXNext ? firstName : lastName;
  //     alert(`${name} wins`);
  //   }, 5000);
  // }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      winner = isXNext ? firstName : lastName;
      return <span></span>;
    } else {
      // Render a countdown
      return <span style={{ fontSize: "25px" }}>{seconds}</span>;
    }
  };
  function renderSquare(i) {
    return (
      <Square
        onClick={() => {
          const nextSquare = squares.slice();
          nextSquare[i] = isXNext ? "X" : "O";
          setXNext(!isXNext);
          setSquare(nextSquare);
          setTimeValue(5000);
          setTurn(isXNext);
          // clearInterval(var2);
          // clearTimeout(myVar);
          // myFunction(isXNext);
        }}
        value={squares[i]}
        highlightWinner={winnerHighlight && winnerHighlight.includes(i)}
      />
    );
  }
  function handleChange(e) {
    const { value, name, type, checked } = e.target;
    console.log(value, name, type, checked, "data herefrom handle chamnge");
    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
  }
  let squareBox;
  if (showSquare) {
    squareBox = (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>

        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>

        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }

  const button = currentButton;
  return (
    <div>
      <main>
        <h2> Enter Players Name </h2>
        <form className="inputForm">
          <input
            id="firstName"
            className="text"
            onChange={handleChange}
            name="firstName"
            placeholder="First Player"
            value={firstName}
          />
          <br />
          <input
            id="lastName"
            className="text"
            onChange={handleChange}
            name="lastName"
            placeholder="Second Player"
            value={lastName}
          />
          <br />
        </form>

        <div className="entered-info">
          <p>First Player Name: {firstName}</p>
          <p>Second Player Name: {lastName}</p>
        </div>
      </main>
      {button}
      <Countdown renderer={renderer} date={Date.now() + timeValue}></Countdown>
      {squareBox}
    </div>
  );
}

export default App;
