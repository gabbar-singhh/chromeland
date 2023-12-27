import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowStatus: {
    visible: false,
    appName: "none",
    noteDisplay: false,
    data: {
      id: "",
      title: "",
      desc: "",
      timestamp: "",
    },
  },
};

export const windowStatusSlice = createSlice({
  name: "WINDOW_STATUS",
  initialState,
  reducers: {
    showWindow: (state, action) => {
      const windowStatus = {
        visible: action.payload.visible,
        appName: action.payload.appName,
        noteDisplay: action.payload.noteDisplay,
        data: {
          id: action.payload.data.id,
          title: action.payload.data.title,
          desc: action.payload.data.desc,
          timestamp: action.payload.data.timestamp,
        },
      };

      state.windowStatus = windowStatus;
    },

    closeWindow: (state, action) => {
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

      state.windowStatus = windowStatus;
    },
  },
});

export const { showWindow, closeWindow } = windowStatusSlice.actions;

export default windowStatusSlice.reducer;
