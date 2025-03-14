import React, { useState } from 'react';
import FriendList from './FriendList';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import FriendService from '../services/FriendService';
import ExpenseService from '../services/ExpenseService';
import CalculationService from '../services/CalculationService';
import './Dashboard.css';

const Dashboard = () => {
  const [friends, setFriends] = useState(FriendService.getFriends());
  const [expenses, setExpenses] = useState(ExpenseService.getExpenses());

  //  Add Friend Handler
  const handleAddFriend = (name) => {
    if (!name.trim()) {
      alert('Friend name cannot be empty');
      return;
    }

    if (friends.some((friend) => friend.name === name.trim())) {
      alert('Friend name must be unique');
      return;
    }

    const newFriend = FriendService.addFriend(name);
    setFriends([...friends, newFriend]);
  };

  //  Edit Friend Handler
  const handleEditFriend = (id, newName) => {
    if (!newName.trim()) {
      alert('Friend name cannot be empty');
      return;
    }

    if (
      friends.some(
        (friend) => friend.name === newName.trim() && friend.id !== id
      )
    ) {
      alert('Friend name must be unique');
      return;
    }

    FriendService.updateFriend(id, newName);
    setFriends(FriendService.getFriends());
  };

  //  Delete Friend Handler
  const handleDeleteFriend = (id) => {
    FriendService.deleteFriend(id);
    setFriends(FriendService.getFriends());
  };

  //  Add Expense Handler
  const handleAddExpense = (newExpense) => {
    const expense = ExpenseService.addExpense(newExpense);
    setExpenses([...expenses, expense]);
  };

  //  Edit Expense Handler
  const handleEditExpense = (updatedExpense) => {
    ExpenseService.updateExpense(updatedExpense);
    setExpenses(ExpenseService.getExpenses());
  };

  //  Delete Expense Handler
  const handleDeleteExpense = (id) => {
    ExpenseService.deleteExpense(id);
    setExpenses(ExpenseService.getExpenses());
  };

  //  Calculate Summary
  const totalExpenses = CalculationService.getTotalExpenses(expenses);
//   const balances = CalculationService.calculateSplit(expenses, friends);

  return (
    <div className="dashboard">
      <h1>Expense Splitter By Charu Tamar</h1>

      {/*  Overview */}
      <div className="overview">
        <div>Total Friends: {friends.length}</div>
        <div>Total Expenses: ₹{totalExpenses.toFixed(2)}</div>
      </div>

      <div className="dashboard-content">
        {/*  Friend List */}
        <FriendList
          friends={friends}
          onAddFriend={handleAddFriend}
          onEditFriend={handleEditFriend}
          onDeleteFriend={handleDeleteFriend}
        />

        {/*  Expense List */}
        <ExpenseList
          expenses={expenses}
          friends={friends}
          onAddExpense={handleAddExpense}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />

        {/*  Expense Summary */}
        <ExpenseSummary expenses={expenses} friends={friends} />
      </div>
    </div>
  );
};

export default Dashboard;
