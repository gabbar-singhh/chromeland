import { combineReducers } from "@reduxjs/toolkit";
import windowStatusSlice from "@/feature/windowFrame/windowStatusSlice";
import notesDataSlice from "@/feature/notes/notesDataSlice";
import todosSlice from "@/feature/todos/todosSlice";

const rootReducer = combineReducers({
  window: windowStatusSlice,
  notes: notesDataSlice,
  todos: todosSlice,
});

export default rootReducer;