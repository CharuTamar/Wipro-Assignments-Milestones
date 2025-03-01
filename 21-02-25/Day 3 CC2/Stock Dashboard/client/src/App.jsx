import React from "react";
import StockDashboard from "./components/StockDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ width: "100vw" }} // Ensures full width
    >
      <StockDashboard />
    </div>
  );
};

export default App;
