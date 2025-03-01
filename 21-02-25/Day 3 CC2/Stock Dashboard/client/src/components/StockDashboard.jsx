import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import StockChart from "./StockChart"; // Import StockChart component

const socket = io("http://localhost:5000", { transports: ["websocket"] });

const StockDashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState({});
  const prevSymbolsRef = useRef([]);

  useEffect(() => {
    socket.on("stockData", (data) => {
      setStockData((prevData) => ({
        ...prevData,
        [data.symbol]: data.data,
      }));
    });

    return () => {
      socket.off("stockData");
    };
  }, []);

  const handleSearch = () => {
    if (!symbol.trim()) return;
    prevSymbolsRef.current.push(symbol);
    socket.emit("subscribeStock", symbol);
    setSymbol(""); // Clear input after searching
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="container p-4 shadow-lg rounded bg-white">
        <h2 className="text-center mb-3">📈 Stock Market Dashboard</h2>

        {/* Search Input */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
          />
          <button className="btn btn-primary" onClick={handleSearch}>🔍 Track</button>
        </div>

        {/* Display Stock Data & Charts */}
        <div className="row">
          {Object.keys(stockData).map((key) => (
            <div key={key} className="col-md-6">
              <div className="card shadow-sm p-3 mb-4 text-center">
                <h4 className="fw-bold">{key}</h4>
                <p className="text-success fs-5">💰 ${stockData[key].c}</p>
                <p>📈 High: ${stockData[key].h} | 📉 Low: ${stockData[key].l}</p>
                <p>🕐 Open: ${stockData[key].o} | 🏁 Prev Close: ${stockData[key].pc}</p>
                <StockChart stockData={stockData[key]} symbol={key} /> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;
