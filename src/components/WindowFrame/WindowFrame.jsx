import React, { useEffect  } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import CloudBtn from "../Extras/CloudBtn/CloudBtn";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";
import { closeWindow } from "@/feature/windowFrame/windowStatusSlice";
import { fetchNotes } from "@/feature/notes/notesDataSlice";

const WindowFrame = ({ children, windowName, visible }) => {
  const windowStatus = useSelector((state) => state.window.windowStatus);
  const notesData = useSelector((state) => state.notes.notesData);
  const dispatch = useDispatch();

  const { user, error, isLoading } = useUser();

  const signInBtnHandler = async () => {
    console.log("SIGN IN FXN IN CALLED!");
    const isFinished = window.open("/api/auth/login", "_self");

    return { isFinished: true };
  };

  const sendNote = async (updatedData) => {
    const { error } = await supabase
      .from("notes")
      .update({ notes: updatedData })
      .eq("email_id", user.email);

    if (error) {
      console.error("Error updating user data:", error.message);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (user && windowStatus.appName == "NotesApp") {
      dispatch(fetchNotes(user.email));
    }
  }, []);

  const deleteNoteHandler = async (note) => {
    const note_id_to_delete = windowStatus.data.id;

    const updated_array = notesData.data.filter(
      (note) => note.id !== note_id_to_delete
    );

    const ifUpdated = await sendNote(updated_array);

    dispatch(fetchNotes(user.email));

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

    if (ifUpdated) {
      updated_array.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }
  };

  return (
    <>
      {windowStatus && (
        <Draggable>
          <section className={styles.container_windowframe}>
            <div className={styles.top_frame}>
              <p
                onClick={() => {
                  dispatch(closeWindow());
                }}
                className={styles.close_program}
              >
                <img src="/icons/x.png" height={15} alt="" />
              </p>

              <div className={styles.black_lines}>
                <div className={styles.line_1}></div>
                <div className={styles.line_2}></div>
                <div className={styles.line_3}></div>
                <div className={styles.line_4}></div>
                <div className={styles.line_4}></div>
              </div>

              <p>{windowName}</p>

              <div className={styles.black_lines}>
                <div className={styles.line_1}></div>
                <div className={styles.line_2}></div>
                <div className={styles.line_3}></div>
                <div className={styles.line_4}></div>
                <div className={styles.line_4}></div>
              </div>
            </div>

            <div className={styles.data_container}>
              {user ? (
                <>
                  {!windowStatus.noteDisplay ? (
                    <>{children}</>
                  ) : (
                    <section className={styles.note_display_frame}>
                      <div className={styles.noteDisplay_box}>
                        <p>{windowStatus.data.desc}</p>
                      </div>

                      <div className={styles.options}>
                        <span onClick={deleteNoteHandler}>{"{ delete }"}</span>
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <CloudBtn
                  href=""
                  customCSS={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyItems: "center",
                    height: "300px",
                  }}
                  txt="SIGN IN"
                  onClick={() => {
                    signInBtnHandler().then((x) => {
                      // insertDataToTodosTable(user.email)
                      console.log("x@@: ", x);
                    });
                  }}
                />
              )}
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
