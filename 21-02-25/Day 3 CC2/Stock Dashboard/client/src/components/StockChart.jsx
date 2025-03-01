import React from "react";
import { Line } from "react-chartjs-2";

const StockChart = ({ stockData }) => {
    const data = {
        labels: stockData.map((s) => s.time),
        datasets: [
            {
                label: "Stock Price",
                data: stockData.map((s) => s.price),
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }
        ]
    };

    return <Line data={data} />;
};

export default StockChart;
