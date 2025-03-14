// src/services/ExpenseService.js
const ExpenseService = {
    getExpenses: () => {
      return JSON.parse(localStorage.getItem("expenses")) || [];
    },
  
    addExpense: ({ amount, description, payer, date }) => {
      const expenses = ExpenseService.getExpenses();
      const newExpense = {
        id: Date.now(),
        amount,
        description,
        payer,
        date,
      };
      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      return newExpense;
    },
  
    deleteExpense: (id) => {
      let expenses = ExpenseService.getExpenses();
      expenses = expenses.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
  
    updateExpense: (updatedExpense) => {
      let expenses = ExpenseService.getExpenses();
      expenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
  };
  
  export default ExpenseService;
  