import React from "react";
import styles from "./NoteFolder.module.css";
import Draggable from "react-draggable";

const NoteFolder = () => {
  return (
    <Draggable>
      <main className={styles.container_notefolder}>
        <img src="/icons/notesapp.png" height={"50px"} width={"auto"} alt="" />
        <p>Sticky Notes</p>
      </main>
    </Draggable>
  );
};

export default NoteFolder;
