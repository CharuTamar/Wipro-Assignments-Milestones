import React, { useState, useEffect } from "react";

const CountdownTimerFunctional = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (timerStarted && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [count, timerStarted]);

  const startCountdown = () => {
    if (inputValue > 0) {
      setCount(parseInt(inputValue));
      setTimerStarted(true);
    }
  };
return (
    <div>
      <h1>Countdown Timer (Functional Component)</h1>
      <input
        type="number"
        placeholder="Enter seconds"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={startCountdown}>Start Countdown</button>
      <h2>{count > 0 ? count : "Time's up!"}</h2>
    </div>
  );
};

export default CountdownTimerFunctional;