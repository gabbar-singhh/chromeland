import React, { useState, useEffect, useContext } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import CloudBtn from "../Buttons/CloudBtn/CloudBtn";
import UserAuthContext from "../ContextAPI/UserAuthContext";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import supabase from "@/lib/supabaseClient";
import NotesDataContext from "../ContextAPI/NotesDataContext";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const WindowFrame = ({ children, windowName, visible }) => {
  const [notes, setNotes] = useState([]);

  const authDetail = useContext(UserAuthContext);
  const windowStatus = useContext(WindowStatusContext);
  const noteContext = useContext(NotesDataContext);

  const { user, error, isLoading } = useUser()

  const setAuthDetailsToContext = () => {
    authDetail.setUserAuthDetail(userData);
  };

  const closeWindow = () => {
    windowStatus.setWindowShow({
      visible: false,
      appName: "none",

      noteDisplay: false,
      data: {
        id: "",
        title: "",
        desc: "",
        timestamp: "",
      },
    });
  };

  const insertDataToUsersTable = async (name, email) => {
    const insertData = await supabase
      .from("users")
      .insert([
        {
          name: name,
          email_id: email,
        },
      ])
      .select();

    console.log("🫂", insertData);
  };

  const insertDataToNotesTable = async (email) => {
    const insertData = await supabase
      .from("notes")
      .insert([
        {
          notes: [],
          email_id: email,
        },
      ])
      .select();

    console.log("🫂", insertData);
  };

  const signInBtnHandler = async () => {
    console.log("SIGN IN FXN IN CALLED!");

    // const isFinished = await window.open('/api/auth/login');

    const isFinished = await window.open('/api/auth/login', "", "toolbar=no,status=no,menubar=no,location=center,scrollbars=no,resizable=no,height=500,width=657");


    // USER-DETAILS SAVED IN CONTEXT API
    console.log(user);
    console.log("isFinished: ", isFinished);

    //   ADD USER TO USERS-TABLE IN SUPABASE
    insertDataToUsersTable(user.name, user.email);

    //    ADDING USER TO NOTES TABLE
    insertDataToNotesTable(user.email);
  };

  const sendNote = async (updatedData) => {
    const { error } = await supabase
      .from("notes")
      .update({ notes: updatedData })
      .eq("email_id", authDetail.userAuthDetail.email);

    if (error) {
      console.error("Error updating user data:", error.message);
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchNotes = async (input_email) => {
      const data = await supabase
        .from("notes")
        .select("notes")
        .eq("email_id", input_email);

      try {
        // WHEN THERE IS ALREADY DATA PRESENT IN SUPA
        noteContext.setNotes(
          data.data[0].notes.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      } catch {
        // WHEN DATA ON SUPA IS EMPTY
        noteContext.setNotes(
          data.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      }

      // console.log("windowframe: ", data.data[0].notes);
    };

    const prevSignInDetails = JSON.parse(localStorage.getItem("user"));
    if (prevSignInDetails) {
      authDetail.setUserAuthDetail(prevSignInDetails);
      fetchNotes(prevSignInDetails.email);
    }
  }, []);

  const editNoteHandler = () => { };

  const deleteNoteHandler = async (note) => {
    const note_id_to_delete = windowStatus.windowShow.data.id;

    const updated_array = noteContext.notes.filter(
      (note) => note.id !== note_id_to_delete
    );

    const ifUpdated = await sendNote(updated_array);

    windowStatus.setWindowShow({
      visible: true,
      appName: "NotesApp",
      noteDisplay: false,
      data: {
        id: "",
        title: "",
        desc: "",
        timestamp: "",
      },
    });

    // console.log("updated: ", updated);
    // console.log("removed_note: ", removed_note);

    if (ifUpdated) {
      noteContext.setNotes(
        updated_array.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      );
    }
  };

  return (
    <>
      {windowStatus.windowShow && (
        <Draggable>
          <section className={styles.container_windowframe}>
            <div className={styles.top_frame}>
              <p onClick={closeWindow} className={styles.close_program}>
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
                  {!windowStatus.windowShow.noteDisplay ? (
                    <>{children}</>
                  ) : (
                    <section className={styles.note_display_frame}>
                      <div className={styles.noteDisplay_box}>
                        <p>{windowStatus.windowShow.data.desc}</p>
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
                  onClick={signInBtnHandler}
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