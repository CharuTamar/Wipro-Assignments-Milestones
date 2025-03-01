const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; // Replace with your API key

io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for stock subscription request from frontend
  socket.on("subscribeStock", async (symbol) => {
    console.log(`Fetching data for: ${symbol}`);

    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      );

      // Send stock data immediately to the client
      socket.emit("stockData", { symbol, data: response.data });
    } catch (error) {
      console.error("Error fetching stock data:", error);
      socket.emit("stockDataError", { message: "Failed to fetch stock data" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
