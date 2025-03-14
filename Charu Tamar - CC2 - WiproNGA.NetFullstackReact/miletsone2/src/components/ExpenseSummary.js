import React from 'react';
import CalculationService from '../services/CalculationService';

const ExpenseSummary = ({ expenses, friends }) => {
  const totalExpenses = CalculationService.getTotalExpenses(expenses);
  const balances = CalculationService.calculateSplit(expenses, friends);

  return (
    <div>
      <h2>Expense Summary</h2>
      <div>Total Expenses: ₹{totalExpenses.toFixed(2)}</div>
      <h3>Balances:</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.name}: ₹{balances[friend.name]?.toFixed(2) || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
