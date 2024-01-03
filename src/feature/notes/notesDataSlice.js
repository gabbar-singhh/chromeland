import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabaseClient";
import { v4 as uuid } from "uuid";

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
  reducers: {
    saveNotes: (state, action) => {
      const { title, content, email: userEmail } = action.payload;
      updateNotes(title, content, userEmail);
    },
    clearNotes: (state, action) => {},
  },
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

const updateNotes = async (title, content, email) => {
  // REMOVING WHITE SPACE FROM TITLE AND CONTENT
  title = title.trim();
  content = content.trim();

  if (content.length !== 0 && title.length !== 0) {
    //CHECKING IF USER HAVE ANY PREVIOUS NOTES STORED IN DATABASE
    const { data, error } = await supabase
      .from("notes")
      .select("notes")
      .eq("email_id", email);

    if (error) return error.message;

    // IF NO PREVIOUS DATA FOUND, INSERT AN EMPTY ARRAY
    if (data.length === 0) {
      const insertData = await supabase
        .from("notes")
        .insert([
          {
            notes: [],
            email_id: email,
          },
        ])
        .select();
      addingNoteToDatabase(title, content, email);
    } else {
      addingNoteToDatabase(title, content, email);
    }
  } else {
    console.log("🚩 ADD CODE FOR NOT VALIDATING!");
  }
};

async function addingNoteToDatabase(title, content, email) {
  // FETCHING EXISTING NOTES FROM DATABASE
  const existingNotes = await fetchLatestNotes(email);

  const newNote = {
    id: uuid(),
    timestamp: new Date().toISOString(),
    title: title,
    desc: content,
  };

  const updatedNotesData = [...existingNotes, { ...newNote }];

  const updated = await sendNotesToDB(email, updatedNotesData);

  if (updated) {
    updated.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
}

async function fetchLatestNotes(email) {
  const { data, error } = await supabase
    .from("notes")
    .select("notes")
    .eq("email_id", email);

  if (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }

  return data[0].notes || {};
}

const sendNotesToDB = async (email, updatedData) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ notes: updatedData })
    .eq("email_id", email)
    .select();

  if (error) {
    console.error("Error updating user data:", error.message);
    return false;
  }

  return data[0].notes;
};

export const { saveNotes, clearNotes } = notesDataSlice.actions;

export default notesDataSlice.reducer;