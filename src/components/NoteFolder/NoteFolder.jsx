import React, { useState, useEffect } from "react";
import styles from "./NoteFolder.module.css";
import Draggable from "react-draggable";
import WindowFrame from "../WindowFrame/WindowFrame";

const NoteFolder = ({ values }) => {
  const [prevData, setPrevData] = useState({ name: "noteFolder", show: false });

  const showWindowFrame = () => {
    if (prevData.show === false) {
      values({
        name: "noteFolder",
        show: true,
      });
      setPrevData({
        name: "noteFolder",
        show: true,
      });
    } else if (prevData.show === true) {
      values({
        name: "noteFolder",
        show: false,
      });
      setPrevData({
        name: "noteFolder",
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
          <p>Sticky Notes</p>
        </main>
      </Draggable>
      <>
        <WindowFrame></WindowFrame>
      </>
    </>
  );
};

export default NoteFolder;
