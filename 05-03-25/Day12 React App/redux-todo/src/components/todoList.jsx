// Backend integration with Redux Toolkit

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/todoSlice";
import TodoItem from "./todoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ✅ Apply filtering correctly
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.isCompleted;
    if (filter === "Pending") return !task.isCompleted;
    return true;
  });

  console.log("Filtered Tasks:", filteredTasks);

  return (
    <ul className="list-group mt-3">
      {filteredTasks.length === 0 ? (
        <li className="list-group-item text-center">No tasks available.</li>
      ) : (
        filteredTasks.map((task) => <TodoItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

export default TodoList;



// // Displays task list

// import React from "react";
// import { useSelector } from "react-redux";
// import TodoItem from "./todoItem";

// const TodoList = () => {
//   const { tasks, filter } = useSelector((state) => state.todo);

//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "All") return true;
//     if (filter === "Completed") return task.completed;
//     if (filter === "Pending") return !task.completed;
//     return false;
//   });

//   return (
//     <ul className="list-group mt-3">
//       {filteredTasks.length === 0 ? (
//         <li className="list-group-item text-center">No tasks available.</li>
//       ) : (
//         filteredTasks.map((task) => <TodoItem key={task.id} task={task} />)
//       )}
//     </ul>
//   );
// };

// export default TodoList;
