import { combineReducers } from "@reduxjs/toolkit";
import windowStatusSlice from "@/feature/windowFrame/windowStatusSlice";

const rootReducer = combineReducers({
  window: windowStatusSlice,
});

export default rootReducer;