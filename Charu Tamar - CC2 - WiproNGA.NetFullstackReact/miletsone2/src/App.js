import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FriendList from "./components/FriendList";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <div>
        {/*  Top-level Navigation */}
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/summary">Summary</Link>
        </nav>

        {/*  Routes */}
        <Routes>
          <Route
            path="/"
            element={<Dashboard friends={friends} expenses={expenses} />}
          />
          <Route
            path="/friends"
            element={<FriendList friends={friends} setFriends={setFriends} />}
          />
          <Route
            path="/expenses"
            element={<ExpenseList expenses={expenses} setExpenses={setExpenses} friends={friends} />}
          />
          <Route
            path="/summary"
            element={<ExpenseSummary expenses={expenses} friends={friends} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
