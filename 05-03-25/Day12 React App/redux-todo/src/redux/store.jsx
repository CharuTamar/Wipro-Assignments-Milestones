import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer, // Make sure this key matches what you use in useSelector
  },
});


export default store;