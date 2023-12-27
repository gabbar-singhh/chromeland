import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  appName: "none",
  noteDisplay: false,
  data: {
    id: "",
    title: "",
    desc: "",
    timestamp: "",
  },
};

export const windowStatusSlice = createSlice({
  name: "WINDOW_STATUS",
  initialState,
  reducers: {
    showWindow: (state, action) => {
      const windowStatus = {
        visible: false,
        appName: "none",
        noteDisplay: false,
        data: {
          id: "",
          title: "",
          desc: "",
          timestamp: "",
        },
      };
    },

    closeWindow: () => {},
  },
});

export const {showWindow, closeWindow} = windowStatusSlice.actions;

export default windowStatusSlice.reducer;