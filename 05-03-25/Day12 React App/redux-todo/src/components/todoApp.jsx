// Backend integration with Redux Toolkit

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, setFilter } from "../redux/todoSlice";
import TodoList from "./todoList";

const TodoApp = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const { filter } = useSelector((state) => state.todo);

  // ✅ Fetch tasks on component load
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">To-Do List</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className={`btn ${filter === "All" ? "btn-secondary" : "btn-outline-secondary"} mx-1`}
          onClick={() => dispatch(setFilter("All"))}
        >
          All
        </button>
        <button
          className={`btn ${filter === "Completed" ? "btn-success" : "btn-outline-success"} mx-1`}
          onClick={() => dispatch(setFilter("Completed"))}
        >
          Completed
        </button>
        <button
          className={`btn ${filter === "Pending" ? "btn-warning" : "btn-outline-warning"} mx-1`}
          onClick={() => dispatch(setFilter("Pending"))}
        >
          Pending
        </button>
      </div>

      <TodoList />
    </div>
  );
};

export default TodoApp;




// // Main to-do app component

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTask, setFilter } from "../redux/todoSlice";
// import TodoList from "./todoList";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TodoApp = () => {
//   const [taskText, setTaskText] = useState("");
//   const dispatch = useDispatch();
  
//   // ✅ Ensure we correctly reference `state.todo`
//   const filter = useSelector((state) => state.todo?.filter || "All"); 

//   const handleAddTask = () => {
//     if (taskText.trim() !== "") {
//       dispatch(addTask(taskText));
//       setTaskText("");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Redux To-Do List</h2>

//       {/* Task Input */}
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter a task..."
//           value={taskText}
//           onChange={(e) => setTaskText(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleAddTask}>
//           Add Task
//         </button>
//       </div>

//       {/* Filter Buttons */}
//       <div className="d-flex justify-content-center gap-2">
//         {["All", "Completed", "Pending"].map((status) => (
//           <button
//             key={status}
//             className={`btn btn-${filter === status ? "dark" : "outline-secondary"}`}
//             onClick={() => dispatch(setFilter(status))}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Task List */}
//       <TodoList />
//     </div>
//   );
// };

// export default TodoApp;

