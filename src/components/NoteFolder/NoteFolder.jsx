import React, { useState, useEffect } from "react";
import styles from "./NoteFolder.module.css";
import Draggable from "react-draggable";
import WindowFrame from "../WindowFrame/WindowFrame";

const Note = ({ values }) => {
  const [prevData, setPrevData] = useState({ name: "Notes", show: false });

  const showWindowFrame = () => {
    if (prevData.show === false) {
      values({
        name: "Notes",
        show: true,
      });
      setPrevData({
        name: "Notes",
        show: true,
      });
    } else if (prevData.show === true) {
      values({
        name: "Notes",
        show: false,
      });
      setPrevData({
        name: "Notes",
        show: false,
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
