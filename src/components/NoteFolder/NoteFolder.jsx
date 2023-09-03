import React, { useState, useEffect, useContext } from "react";
import styles from "./NoteFolder.module.css";
import Draggable from "react-draggable";
import WindowFrame from "../WindowFrame/WindowFrame";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";

const Note = ({ values }) => {
  const windowStatus = useContext(WindowStatusContext);

  const [prevData, setPrevData] = useState({ name: "Notes", show: false });

  const showWindowFrame = () => {
    if (windowStatus.windowShow.visible === false) {
      windowStatus.setWindowShow({
        visible: true,
        appName: "NotesApp",
      });
    } else if (windowStatus.windowShow.visible === true) {
      windowStatus.setWindowShow({
        visible: false,
        appName: "NotesApp",
      });
    }
  };

  return (
    <>
      <Draggable>
        <main className={styles.container_notefolder} onClick={showWindowFrame}>
          <img
            src="/icons/notesapp.png"
            height={"50px"}
            width={"auto"}
            alt="notes icon"
          />
          <p>Notes</p>
        </main>
      </Draggable>
    </>
  );
};

export default Note;
