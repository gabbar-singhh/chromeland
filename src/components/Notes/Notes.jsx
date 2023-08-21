import React from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";

const Notes = () => {
  return (
    <Draggable>
      <main className={styles.container_notes}>
        <p>write your notes!</p>
        <textarea
          name=""
          id=""
          cols="27"
          rows="13"
          className={styles.notes_textarea}
        ></textarea>
      </main>
    </Draggable>
  );
};

export default Notes;
