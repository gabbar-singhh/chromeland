import { combineReducers } from "@reduxjs/toolkit";
import windowStatusSlice from "@/feature/windowFrame/windowStatusSlice";
import notesDataSlice from "@/feature/notes/notesDataSlice";

const rootReducer = combineReducers({
  window: windowStatusSlice,
  notes: notesDataSlice
});

export default rootReducer;