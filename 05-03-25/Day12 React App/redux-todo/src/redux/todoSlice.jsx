// Backend integration with Redux Toolkit

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5289/todos";

// 🟢 Fetch all tasks from API
export const fetchTasks = createAsyncThunk("todo/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  console.log("Fetched Tasks from API:", response.data); // ✅ Log API response
  return response.data;
});

// 🟢 Add New Task
export const addTask = createAsyncThunk("todo/addTask", async (taskText) => {
  const newTask = { title: taskText, isCompleted: false };
  const response = await axios.post(API_URL, newTask);
  return response.data;
});

// 🟢 Toggle Task Completion (Ensure correct API update and state mutation)
export const toggleTask = createAsyncThunk("todo/toggleTask", async (id, { getState }) => {
  const task = getState().todo.tasks.find((task) => task.id === id);
  if (!task) return;

  const updatedTask = { ...task, isCompleted: !task.isCompleted };

  console.log("Before API Call - Updated Task:", updatedTask); // ✅ Debugging Log

  const response = await axios.put(`http://localhost:5289/todos/${id}`, updatedTask);

  console.log("After API Call - Response Data:", response.data); // ✅ Debugging Log

  return response.data;
});




// 🟢 Delete Task
export const deleteTask = createAsyncThunk("todo/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// 🟢 Redux Slice
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    filter: "All",
  },
  reducers: {
    // ✅ Fix: Add setFilter reducer
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("Redux Store Updated - Fetched Tasks:", action.payload);
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log("Redux Store Updated - Added Task:", action.payload);
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        console.log("Redux Store Updated - Toggled Task:", action.payload); // ✅ Check if Redux gets updated task
  
        if (!action.payload) {
          console.error("Error: No data returned from API");
          return;
        }
  
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // ✅ Ensure Redux updates the state
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("Redux Store Updated - Toggled Task:", action.payload);
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  }
});

export const { setFilter } = todoSlice.actions;  // ✅ Fix: Export setFilter action
export default todoSlice.reducer;






// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   tasks: [],  // ✅ Ensure tasks is an array
//   filter: "All", // ✅ Ensure filter is a string
// };

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       state.tasks.push({
//         id: Date.now(),
//         text: action.payload,
//         completed: false,
//       });
//     },
//     toggleTask: (state, action) => {
//       const task = state.tasks.find((task) => task.id === action.payload);
//       if (task) task.completed = !task.completed;
//     },
//     deleteTask: (state, action) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addTask, toggleTask, deleteTask, setFilter } = todoSlice.actions;
// export default todoSlice.reducer;
