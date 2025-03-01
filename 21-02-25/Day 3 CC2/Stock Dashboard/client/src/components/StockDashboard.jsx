import React, { Component } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import StockChart from "./StockChart";

class StockDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            stockSymbol: "", // Controlled Component
            previousSearches: [] // Uncontrolled Component
        };
        this.socket = io("http://localhost:5000");
    }

    // Fetch initial stock data when component mounts
    componentDidMount() {
        this.socket.on("stockUpdate", (data) => {
            this.setState({ stocks: data });
        });
    }

    // Handle input change (Controlled Component)
    handleInputChange = (e) => {
        this.setState({ stockSymbol: e.target.value });
    };

    // Handle form submission
    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.stockSymbol.trim()) {
            this.setState((prevState) => ({
                previousSearches: [...prevState.previousSearches, prevState.stockSymbol],
                stockSymbol: "" // Clear input field after search
            }));
        }
    };

    render() {
        return (
            <div className="container mt-4">
                <h2 className="text-center">📈 Stock Market Dashboard</h2>
                
                {/* Search Input (Controlled Component) */}
                <form className="mb-3" onSubmit={this.handleSearch}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter stock symbol"
                        value={this.state.stockSymbol}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit" className="btn btn-primary mt-2">Search</button>
                </form>

                {/* Display Live Stock Prices */}
                <div className="card p-3">
                    <h4>Live Stock Prices:</h4>
                    <ul className="list-group">
                        {this.state.stocks.map((stock) => (
                            <li key={stock.symbol} className="list-group-item">
                                {stock.symbol}: ${stock.price}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Previous Searches (Uncontrolled Component) */}
                <div className="mt-4">
                    <h4>🔍 Previous Searches:</h4>
                    <ul className="list-group">
                        {this.state.previousSearches.map((symbol, index) => (
                            <li key={index} className="list-group-item">{symbol}</li>
                        ))}
                    </ul>
                </div>
            

{/* Inside render() */}
{this.state.stocks.length > 0 && <StockChart stockData={this.state.stocks} />}

            </div>
        );
    }
}

export default StockDashboard;
