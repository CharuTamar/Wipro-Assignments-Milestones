// Backend integration with Redux Toolkit

import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../redux/todoSlice";

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        onClick={() => dispatch(toggleTask(task.id))}
        className={`task-text ${task.isCompleted ? "text-decoration-line-through text-success" : ""}`}
        style={{ cursor: "pointer" }}
      >
        {task.title} 
      </span>


      <span>
        <span className={`badge ${task.isCompleted ? "bg-success" : "bg-warning"} me-2`}>
          {task.isCompleted ? "Completed" : "Pending"}
        </span>


        <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTask(task.id))}>
          ❌
        </button>
      </span>
    </li>
  );
};

export default TodoItem;






// Individual task component

// import React from "react";
// import { useDispatch } from "react-redux";
// import { toggleTask, deleteTask } from "../redux/todoSlice";

// const TodoItem = ({ task }) => {
//   const dispatch = useDispatch();

//   return (
//     <li className="list-group-item d-flex justify-content-between align-items-center">
//       <span
//         onClick={() => dispatch(toggleTask(task.id))}
//         className={`task-text ${task.completed ? "text-decoration-line-through text-success" : ""}`}
//         style={{ cursor: "pointer" }}
//       >
//         {task.text}
//       </span>

//       <span>
//         <span className={`badge ${task.completed ? "bg-success" : "bg-warning"} me-2`}>
//           {task.completed ? "Completed" : "Pending"}
//         </span>
//         <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteTask(task.id))}>
//           ❌
//         </button>
//       </span>
//     </li>
//   );
// };

// export default TodoItem;
