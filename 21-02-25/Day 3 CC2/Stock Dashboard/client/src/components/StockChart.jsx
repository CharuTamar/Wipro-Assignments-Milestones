import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const StockChart = ({ stockData, symbol }) => {
  if (!stockData || Object.keys(stockData).length === 0) return null;

  const chartData = {
    labels: ["Open", "High", "Low", "Current"],
    datasets: [
      {
        label: `${symbol} Price Trend`,
        data: [stockData.o, stockData.h, stockData.l, stockData.c],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: "300px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default StockChart;
