import React, { useState } from "react";

const FaultyComponent = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("Oops! An error occurred.");
  }

  return (
    <div>
      <h3>Click the button to trigger an error</h3>
      <button onClick={() => setThrowError(true)}>Trigger Error</button>
    </div>
  );
};

export default FaultyComponent;