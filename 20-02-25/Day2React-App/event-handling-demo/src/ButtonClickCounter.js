import React, { useState } from "react";

const ButtonClickCounter = () => {
  const [count, setCount] = useState(0);

  // Event handler function
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Button Click Counter (Functional Component)</h2>
      <p>Button clicked {count} times</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default ButtonClickCounter;