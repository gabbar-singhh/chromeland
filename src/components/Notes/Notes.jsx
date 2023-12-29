import { useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch } from "react-redux";
import { saveNotes } from "@/feature/notes/notesDataSlice";

const Notes = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  const clearNotes = () => {
    setCurrentTitle("");
    setCurrentDesc("");
  };

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
          <span
            onClick={() => {
              dispatch(
                saveNotes({
                  title: currentTitle,
                  content: currentDesc,
                  email: user.email,
                })
              );
              clearNotes();
            }}
          >
            save
          </span>
        </div>
      </main>
    </Draggable>
  );
};

export default Notes;