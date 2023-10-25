import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import dateFormat from "dateformat";
import NotesDataContext from "../ContextAPI/NotesDataContext";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import TodosDataContext from "../ContextAPI/TodosDataContext";
import supabase from "@/lib/supabaseClient";
import { v4 as uuid } from "uuid";
import { useUser } from "@auth0/nextjs-auth0/client";

const Notes = () => {
  const [currentTitle, setCurrentTitle] = useState("click to edit title");
  const [currentDesc, setCurrentDesc] = useState("");

  // USING CONTEXT
  const noteContext = useContext(NotesDataContext);
  const windowStatus = useState(WindowStatusContext);
  const todoContext = useContext(TodosDataContext);

  const { user, error, isLoading } = useUser();

  const clearNotes = () => {
    setCurrentTitle("click to edit title");
    setCurrentDesc("");
  };

  // GETTING LATEST UPADTED NOTES JSON
  async function fetchLatestNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("notes")
      .eq("email_id", user.email);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }

    return data[0].notes || {};
  }

  async function appendDataToJSON(existingData, newData) {
    const updatedData = [...existingData, { ...newData }];
    return updatedData;
  }

  const sendNote = async (updatedData) => {
    const { data, error } = await supabase
      .from("notes")
      .update({ notes: updatedData })
      .eq("email_id", user.email)
      .select();

    if (error) {
      console.error("Error updating user data:", error.message);
      return false;
    }

    return data[0].notes;
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

    console.log(":: ", updated);

    if (updated) {
      noteContext.setNotes(
        updated.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
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
    if (currentDesc.length === 0 || currentTitle === "click to edit title") {
      console.log("values empty");
      console.log("noteContext: ", noteContext.notes);
      console.log("windowStatus: ", windowStatus.windowShow);
      console.log("todoContext: ", todoContext.todos);
    } else {
      // CHECKING IF AN EMPTY JSON OBJ EXISTS OR NOT, IF NOT IT WILL CREATE ONE
      const { data, error } = await supabase
        .from("notes")
        .select("notes")
        .eq("email_id", user.email);

      if (error) {
        console.error("Error fetching user todos:", error.message);
        return null;
      }

      console.log("data[0].notes", data.length, data);

      if (data.length === 0) {
        // IT WILL CREATE A ROW IN notes TABLE WITH EMPTY JSON
        insertDataToNotesTable(user.email);
        fetchAndUpdateNote();
      } else {
        fetchAndUpdateNote();
      }
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
          <span onClick={clearNotes}>{"clear"}</span>
          <span onClick={checkAndSendNote}>save</span>
        </div>
      </main>
    </Draggable>
  );
};

export default Notes;
