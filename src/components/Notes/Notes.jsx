import React, { useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";

const Notes = () => {
  const [noteText, setNoteText] = useState("");

  const clearNotes = () => {
    setNoteText("");
  };

  return (
    <Draggable>
      <main className={styles.container_notes}>
        <p>write your notes</p>
        <textarea
          name=""
          id=""
          cols="27"
          placeholder="what's on your mind?!"
          rows="13"
          value={noteText}
          onChange={(e) => {
            setNoteText(e.target.value);
          }}
          className={styles.notes_textarea}
        ></textarea>
        
        <div className={styles.notes_buttons}>
          <span onClick={clearNotes}>{"{X}"}</span>

          <span>
            {"{"}&#10003;{"}"}
          </span>
        </div>
      </main>
    </Draggable>
  );
};

export default Notes;
