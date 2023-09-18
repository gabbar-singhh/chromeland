import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import dateFormat from "dateformat";
import { getFirestore} from "firebase/firestore";
import UserAuthContext from "../ContextAPI/UserAuthContext";
import { db } from "@/lib/firebase";
import supabase from "@/lib/supabaseClient";

const Notes = () => {
  const [currentTitle, setCurrentTitle] = useState("click to edit title");
  const [currentDesc, setCurrentDesc] = useState("");
  const [notes, setNotes] = useState([]);

  const authDetail = useContext(UserAuthContext);

  const clearNotes = () => {
    setCurrentTitle("click to edit title");
    setCurrentDesc("");
  };

  const saveNotes = () => {
    console.log("clicked!");

    // INIT NEW DATE OBJ
    const timestamp = new Date();
    const dbm = getFirestore();

    // VALIDATING WHEATHER TITLE & DESC ARE NOT EMPTY
    if (currentTitle && currentDesc) {
      console.log(authDetail.userAuthDetail.email);
      try {

        localStorage.setItem("localNotes", JSON.stringify({}));

        console.log("👉🏽👉🏽 Documents added with IDs: ");
      } catch (error) {
        console.error("Error adding documents: ", error);
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
          <span onClick={clearNotes}>{"{X}"}</span>
          <span onClick={saveNotes}>
            {"{"}&#10003;{"}"}
          </span>
        </div>
      </main>
    </Draggable>
  );
};

export default Notes;
