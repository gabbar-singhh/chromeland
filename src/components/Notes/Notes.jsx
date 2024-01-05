import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Notes.module.css";
import { useDispatch } from "react-redux";
import { saveNotes } from "@/feature/notes/notesDataSlice";
import { useSession } from "@supabase/auth-helpers-react";

const Notes = () => {
  const session = useSession();
  const dispatch = useDispatch();

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  const clearNotes = () => {
    setCurrentTitle("");
    setCurrentDesc("");

    localStorage.removeItem("TEMP_TITLE");
    localStorage.removeItem("TEMP_CONTENT");
  };

  useEffect(() => {
    try {
      const TEMP_TITLE = JSON.parse(localStorage.getItem("TEMP_TITLE"));
      const TEMP_CONTENT = JSON.parse(localStorage.getItem("TEMP_CONTENT"));
      setCurrentTitle(TEMP_TITLE);
      setCurrentDesc(TEMP_CONTENT);
    } catch {
      setCurrentTitle("");
      setCurrentDesc("");
    }
  }, []);

  return (
    <Draggable>
      <main className={styles.container_notes}>
        <textarea
          name=""
          id=""
          cols="auto"
          placeholder="add title"
          rows="1"
          value={currentTitle}
          onChange={(e) => {
            if (e.target.innerText.length > 30) {
              setCurrentTitle(e.target.value.substring(0, 30));

              localStorage.setItem(
                "TEMP_TITLE",
                JSON.stringify(e.target.value.substring(0, 30))
              );
            } else {
              setCurrentTitle(e.target.value);

              localStorage.setItem(
                "TEMP_TITLE",
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
              "TEMP_CONTENT",
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
                  email: session.user.email,
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
