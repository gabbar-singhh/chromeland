import { createSlice } from "@reduxjs/toolkit";
import supabase from "@/lib/supabaseClient";

const initialState = {
  sessionData: [],
};

export const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    signIn: (state, action) => {
      googleSignIn();
    },
    signOut: (state, action) => {
      googleSignOut();
    },
  },
});

async function googleSignIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/calendar",
    },
  });

  if (error) {
    alert("error logging in");
    console.log(error);
  }
}

async function googleSignOut() {
  await supabase.auth.signOut();
}

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
