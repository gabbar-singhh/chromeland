import React, { useContext, useState, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import dateFormat from "dateformat";
import NotesDataContext from "../ContextAPI/NotesDataContext";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import TodosDataContext from "../ContextAPI/TodosDataContext";
import supabase from "@/lib/supabaseClient";
import { v4 as uuid } from "uuid";
import { useUser } from "@auth0/nextjs-auth0/client";
import { trim } from "lodash";
import { useSelector, useDispatch } from "react-redux";

const Notes = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  // USING CONTEXT
  const windowStatus = useSelector((state) => state.window.windowStatus);
  const noteContext = useContext(NotesDataContext);
  const todoContext = useContext(TodosDataContext);

  const { user, error, isLoading } = useUser();

  const clearNotes = () => {
    setCurrentTitle("");
    setCurrentDesc("");

    localStorageSetTempNote();
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
      setCurrentTitle("");
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
    if (currentDesc.trim().length === 0 || currentTitle.trim() === "") {
      console.log("values empty");
      console.log("noteContext: ", noteContext.notes);
      console.log("windowStatus: ", windowStatus);
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
        localStorageSetTempNote();
      } else {
        fetchAndUpdateNote();
        localStorageSetTempNote();
      }
    }
  };

  function localStorageSetTempNote() {
    localStorage.setItem("temp_notes_title", JSON.stringify(""));

    localStorage.setItem("temp_notes_desc", JSON.stringify(""));
  }

  useEffect(() => {
    const notes_title = JSON.parse(localStorage.getItem("temp_notes_title"));
    const notes_desc = JSON.parse(localStorage.getItem("temp_notes_desc"));

    setCurrentDesc(notes_desc);
    setCurrentTitle(notes_title);
  }, []);

  return (
    <Draggable>
      <main className={styles.container_notes}>
        <textarea
          name=""
          id=""
          cols="auto"
          placeholder="click to edit title"
          rows="1"
          value={currentTitle}
          onChange={(e) => {
            if (e.target.innerText.length > 30) {
              setCurrentTitle(e.target.value.substring(0, 30));

              localStorage.setItem(
                "temp_notes_title",
                JSON.stringify(e.target.value.substring(0, 30))
              );
            } else {
              setCurrentTitle(e.target.value);

              localStorage.setItem(
                "temp_notes_title",
                JSON.stringify(e.target.value)
              );
            }
          }}
          className={styles.title_textarea}
        ></textarea>
        <textarea
          name=""
          id=""
          cols="27"
          placeholder="what's on your mind?!"
          rows="13"
          value={currentDesc}
          onChange={(e) => {
            setCurrentDesc(e.target.value);

            localStorage.setItem(
              "temp_notes_desc",
              JSON.stringify(e.target.value)
            );
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
