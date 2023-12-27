import React, { useState, useEffect, useContext } from "react";
import styles from "./NoteFolder.module.css";
import Draggable from "react-draggable";
import WindowFrame from "../WindowFrame/WindowFrame";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import { useDispatch, useSelector } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";

const Note = ({ values }) => {
  const windowStatus = useSelector((state) => state.window.windowStatus);

  const [prevData, setPrevData] = useState({ name: "Notes", show: false });
  const dispatch = useDispatch();

  const showWindowFrame = () => {
    dispatch(
      showWindow({
        visible: true,
        appName: "NotesApp",
        noteDisplay: false,
        data: {
          id: "",
          title: "",
          desc: "",
          timestamp: "",
        },
      })
    );
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