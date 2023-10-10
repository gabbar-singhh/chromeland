import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";
import PomodoroTimer from "@/components/PomodoroFocus/PomoFocus";
import PomoFocusApp from "@/components/PomodoroFocus/PomoFocusApp";
import UserAuthContext from "@/components/ContextAPI/UserAuthContext";
import WindowStatusContext from "@/components/ContextAPI/WindowStatusContext";
import NotesDataContext from "@/components/ContextAPI/NotesDataContext";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home({ children }) {
  const authDetail = useContext(UserAuthContext);
  const windowStatus = useContext(WindowStatusContext);
  const notesJson = useContext(NotesDataContext);

  // AUTH0 
  const { user, error, isLoading } = useUser();

  // TEMP FUNCTION
  const signOutBtnHandler = async () => {
    console.log("SIGN OUT FXN IN CALLED!");

    const isFinished = await window.open('/api/auth/logout');

    notesJson.notes([{ notes: [] }])

  };

  const viewNote = (e) => {
    const clickedNoteID = e.currentTarget.getAttribute("data-id");
    const clickedNoteTitle = e.currentTarget.querySelector('p').textContent;
    // console.log(e.currentTarget);
    // console.log(clickedNoteTitle);


    console.log("clickedNoteID", clickedNoteID);
    const note = notesJson.notes.filter(note => note.id === clickedNoteID)[0]

    console.log("note", note);

    windowStatus.setWindowShow({
      visible: true,
      appName: clickedNoteTitle,
      noteDisplay: true,
      data: {
        id: note.id,
        title: clickedNoteTitle,
        desc: note.desc,
        timestamp: note.timestamp
      }
    });
  };

  useEffect(() => {
    const fetchNotes = async (input_email) => {
      const data = await supabase
        .from("notes")
        .select("notes")
        .eq("email_id", input_email);

      try {
        // WHEN THERE IS ALREADY DATA PRESENT IN SUPA
        notesJson.setNotes(
          data.data[0].notes.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      } catch {
        // WHEN DATA ON SUPA IS EMPTY
        notesJson.setNotes(
          data.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )
        );
      }
    };

    const prevSignInDetails = JSON.parse(localStorage.getItem("user"));
    if (prevSignInDetails) {
      authDetail.setUserAuthDetail(prevSignInDetails);
      fetchNotes(prevSignInDetails.email);
    }

    console.log("index.js windowStatus: ", windowStatus.windowShow);
  }, []);

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {windowStatus.windowShow.visible && (
        <WindowFrame
          windowName={windowStatus.windowShow.appName}
          visible={true}
        >
          {windowStatus.windowShow.appName == "NotesApp" &&
            user && (
              <ul className={styles.ul_list}>
                {notesJson.notes.length === 0 ? (
                  <>
                    <p style={{ fontSize: "0.8em" }}>NO FILES FOUND</p>
                  </>
                ) : (
                  <>
                    {notesJson.notes.map((note) => {
                      { console.log("notesJson ", notesJson.notes) }
                      return (
                        <li key={note.id} data-id={note.id} onClick={viewNote}>
                          <img src="/icons/file_icon.webp" alt="" height={50} />
                          <p>{note.title + ".txt"}</p>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            )}

          {windowStatus.windowShow.appName == "PomoFocus" && (
            <section className={styles.wrapper}>
              <PomoFocusApp />
            </section>
          )}
        </WindowFrame>
      )}
      <section className={styles.folder_section}>
        <NoteFolder />
        <PomodoroTimer />
        <p style={{ color: "red" }} onClick={signOutBtnHandler}>
          {user &&
            user.email
          }
        </p>
      </section>
    </Layout>
  );
}
