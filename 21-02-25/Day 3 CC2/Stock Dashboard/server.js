const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());

const STOCK_API_URL = "https://latest-stock-price.p.rapidapi.com/any";
const API_HEADERS = {
    'x-rapidapi-key': '844031898dmsh76ea9e8ea23cdbdp161dcfjsn982f1e54063f',  // Replace with your actual API key
    'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com'
};

// Function to fetch stock data
const fetchStockData = async () => {
    try {
        const response = await axios.get(STOCK_API_URL, {
            params: { Symbol: "INFO.NS", Timescale: "1", Period: "1DAY" },
            headers: API_HEADERS
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};

// Emit stock prices every 5 seconds
setInterval(async () => {
    const stockData = await fetchStockData();
    if (stockData) {
        io.emit("stockUpdate", stockData); // Send stock data to all connected clients
    }
}, 5000);

io.on("connection", (socket) => {
    console.log("Client connected");

    // Send initial stock data immediately on connection
    fetchStockData().then(stockData => {
        if (stockData) {
            socket.emit("stockUpdate", stockData);
        }
    });

    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(5000, () => console.log("Server running on port 5000"));
