import windowReducer from "@/feature/windowFrame/windowStatusSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
reducer: windowReducer
});