import { combineReducers } from "@reduxjs/toolkit";
import windowStatusSlice from "@/feature/windowFrame/windowStatusSlice";
import notesDataSlice from "@/feature/notes/notesDataSlice";
import todosSlice from "@/feature/todos/todosSlice";
import authSlice from "@/feature/auth/authSlice";

const rootReducer = combineReducers({
  window: windowStatusSlice,
  notes: notesDataSlice,
  todos: todosSlice,
  auth: authSlice
});

export default rootReducer;