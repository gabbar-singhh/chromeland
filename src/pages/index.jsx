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

  useEffect(() => {
    console.log("💀 ", notesJson.notes.todos);
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
          {windowStatus.windowShow.appName == "NotesApp" && (
            <ul className={styles.ul_list}>
              {notesJson.notes.todos.map((file) => {
                return (

                  <li key={file.name}>
                    <img src="/icons/file_icon.webp" alt="" height={50} />
                    <p>{file.name + ".txt"}</p>
                  </li>
                )
              })
              }
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