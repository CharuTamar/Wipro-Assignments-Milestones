// src/components/ExpenseList.js
import { useState } from "react";
import ExpenseService from "../services/ExpenseService";
import FriendService from "../services/FriendService";
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState(ExpenseService.getExpenses());
  const friends = FriendService.getFriends();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [payer, setPayer] = useState("");
  const [date, setDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    amount: "",
    description: "",
    payer: "",
    date: "",
  });

  //  Add Expense
  const handleAddExpense = () => {
    if (!amount || !description || !payer) {
      alert("Please fill all required fields");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Amount should be a positive number");
      return;
    }

    const newExpense = ExpenseService.addExpense({
      amount: parseFloat(amount),
      description,
      payer,
      date,
    });

    setExpenses([...expenses, newExpense]);
    setAmount("");
    setDescription("");
    setPayer("");
    setDate("");
  };

  //  Delete Expense
  const handleDeleteExpense = (id) => {
    ExpenseService.deleteExpense(id);
    setExpenses(ExpenseService.getExpenses());
  };

  // Start Editing Expense
  const handleEditExpense = (expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  // Save Edited Expense
  const handleSaveEdit = () => {
    if (
      !editedExpense.amount ||
      !editedExpense.description ||
      !editedExpense.payer
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (isNaN(editedExpense.amount) || parseFloat(editedExpense.amount) <= 0) {
      alert("Amount should be a positive number");
      return;
    }

    ExpenseService.updateExpense(editedExpense);
    setExpenses(ExpenseService.getExpenses());
    setEditingId(null);
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      {/* Add Expense Form */}
      <div className="add-expense">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={payer} onChange={(e) => setPayer(e.target.value)}>
          <option value="">Select Payer</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.name}>
              {friend.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/*  Display Expenses */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {editingId === expense.id ? (
              <>
                {/*  Editable Fields */}
                <input
                  type="number"
                  value={editedExpense.amount}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      amount: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editedExpense.description}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      description: e.target.value,
                    })
                  }
                />
                <select
                  value={editedExpense.payer}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      payer: e.target.value,
                    })
                  }
                >
                  <option value="">Select Payer</option>
                  {friends.map((friend) => (
                    <option key={friend.id} value={friend.name}>
                      {friend.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editedExpense.date || ""}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      date: e.target.value,
                    })
                  }
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {/* Display Expense */}
                <span>
                  {expense.description} - ₹{expense.amount} paid by{" "}
                  {expense.payer} {expense.date && `on ${expense.date}`}
                </span>
                <button onClick={() => handleEditExpense(expense)}>Edit</button>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
