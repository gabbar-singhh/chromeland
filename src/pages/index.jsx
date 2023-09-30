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
import { signOut } from "firebase/auth";
import { auth, getAuth } from "firebase/auth";
// DON'T REMOVE 👇
import { FirebaseApp } from "firebase/app";
import supabase from "@/lib/supabaseClient";

export default function Home({ children }) {
  const authDetail = useContext(UserAuthContext);
  const windowStatus = useContext(WindowStatusContext);
  const notesJson = useContext(NotesDataContext);

  const auth = getAuth();

  // TEMP FUNCTION
  const signOutBtnHandler = () => {
    signOut(auth)
      .then(() => {
        authDetail.setUserAuthDetail({
          credential: "",
          token: "",
          displayName: "",
          email: "",
          photoURL: "",
          isLoggedIn: false,
        });

        localStorage.removeItem("user");

        console.log("🟡 LOGOUT SUCCESS!");
      })
      .catch((error) => {
        // An error happened.
        console.log("🔴Error in WindowFrame.jsx", error);
      });
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
            authDetail.userAuthDetail.isLoggedIn && (
              <ul className={styles.ul_list}>
                {notesJson.notes.length === 0 ? (
                  <>
                    <p style={{ fontSize: "0.8em" }}>NO FILES FOUND</p>
                  </>
                ) : (
                  <>
                    {notesJson.notes.map((note) => {
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
          {authDetail.userAuthDetail.email}
        </p>
      </section>
    </Layout>
  );
}
