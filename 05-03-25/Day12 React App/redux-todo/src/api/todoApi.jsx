import axios from "axios";

const API_URL = "http://localhost:5289/todos";

// Fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new todo
export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id, todo) => {
  await axios.put(`${API_URL}/${id}`, todo);
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
