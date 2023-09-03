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
// DON'T REMOVE 👇
import { FirebaseApp } from "firebase/app";

export default function Home({}) {
  const authDetail = useContext(UserAuthContext);
  const windowStatus = useContext(WindowStatusContext);

  const check_data = (e) => {};

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
          {windowStatus.windowShow.appName == "NotesFolder" && (
            <ul>
              {/* {userData.map((user) => {
                return (
                  <span key={user._id} className={styles.note_item}>
                    <img src="/icons/file_icon.webp" alt="" height={50} />
                    <p>{user.name + ".txt"}</p>
                  </span>
                );
              })} */}
              <li>lol</li>
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
      </section>
    </Layout>
  );
}
