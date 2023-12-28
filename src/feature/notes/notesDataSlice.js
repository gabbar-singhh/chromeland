import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabaseClient";

export const fetchNotes = createAsyncThunk(
  "fetchNotes",
  async (input_email) => {
    const data = await supabase
      .from("notes")
      .select("notes")
      .eq("email_id", input_email);

    try {
      // WHEN THERE IS ALREADY DATA PRESENT IN SUPA
      return data.data[0].notes.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    } catch {
      // WHEN DATA ON SUPA IS EMPTY
      return data.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }
  }
);

const initialState = {
  notesData: {
    isLoading: false,
    data: null,
    isError: false,
  },
};

const notesDataSlice = createSlice({
  name: "NOTES_DATA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.notesData = {
        isLoading: true,
        data: null,
        isError: false,
      };
      console.log("💀", "fetchNotes-Pending");
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notesData = {
        isLoading: false,
        data: action.payload,
        isError: false,
      };
      console.log("💀", "action.payload: ", action.payload);
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.notesData = {
        isLoading: false,
        data: null,
        isError: true,
      };
      console.log("💀", "fetchNotes-Error");
    });
  },
});

export default notesDataSlice.reducer;