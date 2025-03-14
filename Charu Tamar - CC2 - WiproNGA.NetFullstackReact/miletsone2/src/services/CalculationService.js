const CalculationService = {
    //  Calculate total expenses
    getTotalExpenses(expenses) {
      return expenses.reduce((total, expense) => total + expense.amount, 0);
    },
  
    //  Split calculation
    calculateSplit(expenses, friends) {
      const balances = {};
  
      friends.forEach((friend) => {
        balances[friend.name] = 0;
      });
  
      expenses.forEach((expense) => {
        const sharePerPerson = expense.amount / friends.length;
        friends.forEach((friend) => {
          if (friend.name === expense.payer) {
            balances[friend.name] += expense.amount - sharePerPerson;
          } else {
            balances[friend.name] -= sharePerPerson;
          }
        });
      });
  
      return balances;
    },
  };
  
  export default CalculationService;
  