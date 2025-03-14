import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const StockPrices = () => {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5136/stockhub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("Connected to Stock Hub"))
      .catch(err => console.error("Connection failed: ", err));

    connection.on("ReceiveStockUpdate", (stockName, price) => {
      setStocks(prevStocks => ({
        ...prevStocks,
        [stockName]: price.toFixed(2)
      }));
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>📈 Live Stock Prices</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stocks).map(stock => (
            <tr key={stock}>
              <td>{stock}</td>
              <td>{stocks[stock]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockPrices;
