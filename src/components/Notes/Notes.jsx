import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import dateFormat from "dateformat";
import { getFirestore } from "firebase/firestore";
import UserAuthContext from "../ContextAPI/UserAuthContext";
import NotesDataContext from "../ContextAPI/NotesDataContext";
import { db } from "@/lib/firebase";
import supabase from "@/lib/supabaseClient";
import { v4 as uuid } from "uuid";

const Notes = () => {
  const [currentTitle, setCurrentTitle] = useState("click to edit title");
  const [currentDesc, setCurrentDesc] = useState("");

  // USING CONTEXT
  const authDetail = useContext(UserAuthContext);
  const noteContext = useContext(NotesDataContext);

  const clearNotes = () => {
    setCurrentTitle("click to edit title");
    setCurrentDesc("");
  };

  // GETTING LATEST UPADTED NOTES JSON
  async function fetchLatestNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("notes")
      .eq("email_id", authDetail.userAuthDetail.email);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }

    // console.log("data[0].notes", data[0].notes);
    return data[0].notes || {};
  }

  async function appendDataToJSON(existingData, newData) {
    const updatedData = [...existingData, { ...newData }];
    return updatedData;
  }

  const sendNote = async (updatedData) => {
    const { error } = await supabase
      .from("notes")
      .update({ notes: updatedData })
      .eq("email_id", authDetail.userAuthDetail.email);

    if (error) {
      console.error("Error updating user data:", error.message);
      return false;
    }

    return true;
  };

  async function fetchAndUpdateNote() {
    const timestamp = new Date().toISOString();

    const existingData = await fetchLatestNotes();
    const newData = {
      id: uuid(),
      timestamp: timestamp,
      title: currentTitle,
      desc: currentDesc,
    };

    const updatedData = await appendDataToJSON(existingData, newData);

    const updated = await sendNote(updatedData);

    console.log("updatedData:: ", updatedData);

    if (updated) {
      noteContext.setNotes(
        updatedData.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      );
      setCurrentTitle("click to edit title");
      setCurrentDesc("");
    }
  }

  const insertDataToNotesTable = async (email) => {
    const insertData = await supabase
      .from("notes")
      .insert([
        {
          notes: [],
          email_id: email,
        },
      ])
      .select();

    console.log("🫂", insertData);
  };

  // BY ANY CHANCE, IF EMPTY ARRAY JSON IS NOT ADDED DURING SIGN-IN THIS WILL CHECK AND DO AS FOLLOWING
  const checkAndSendNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("notes")
      .eq("email_id", authDetail.userAuthDetail.email);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }

    console.log("data[0].notes", data.length, data);

    if (data.length === 0) {
      // IT WILL CREATE A ROW IN notes TABLE WITH EMPTY JSON
      insertDataToNotesTable(authDetail.userAuthDetail.email);

      fetchAndUpdateNote();
    } else {
      fetchAndUpdateNote();
    }
  };

  return (
    <Draggable>
      <main className={styles.container_notes}>
        <p
          className={styles.title_textarea}
          contentEditable="true"
          onBlur={(e) => {
            if (e.target.innerText.length > 30) {
              setCurrentTitle(e.target.innerText.substring(0, 30));
            } else {
              setCurrentTitle(e.target.innerText);
            }
          }}
          dangerouslySetInnerHTML={{ __html: currentTitle }}
        ></p>
        <textarea
          name=""
          id=""
          cols="27"
          placeholder="what's on your mind?!"
          rows="13"
          value={currentDesc}
          onChange={(e) => {
            setCurrentDesc(e.target.value);
          }}
          className={styles.notes_textarea}
        ></textarea>

        <div className={styles.notes_buttons}>
          <span onClick={clearNotes}>{"{X}"}</span>
          <span onClick={checkAndSendNote}>
            {"{"}&#10003;{"}"}
          </span>
        </div>
      </main>
    </Draggable>
  );
};

export default Notes;
