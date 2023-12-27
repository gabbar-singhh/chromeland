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
import WindowStatusContext from "@/components/ContextAPI/WindowStatusContext";
import NotesDataContext from "@/components/ContextAPI/NotesDataContext";
import TodosDataContext from "@/components/ContextAPI/TodosDataContext";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import Profile from "@/components/Profile/Profile";
import MenuProfile from "@/components/Profile/MenuProfile";
import MenuSocials from "@/components/Profile/MenuSocials";
import MenuFeedback from "@/components/Profile/MenuFeedback";
import { useSelector, useDispatch } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";

export default function Home({ children }) {
  const notesJson = useContext(NotesDataContext);
  const todoContext = useContext(TodosDataContext);

  const windowStatus = useSelector((state) => state.windowStatus);
  const dispatch = useDispatch();

  // AUTH0
  const { user, error, isLoading } = useUser();

  // TEMP FUNCTION
  const signOutBtnHandler = async () => {
    console.log("SIGN OUT FXN IN CALLED!");

    const isFinished = await window.open("/api/auth/logout");

    notesJson.setNotes([{ notes: [] }]);

    window.close();
  };

  const signInBtnHandler = async () => {
    console.log("SIGN IN FXN IN CALLED!");
    const isFinished = window.open("/api/auth/login", "_self");

    return { isFinished: true };
  };

  const viewNote = (e) => {
    const clickedNoteID = e.currentTarget.getAttribute("data-id");
    const clickedNoteTitle = e.currentTarget.querySelector("p").textContent;

    console.log("clickedNoteID", clickedNoteID);
    const note = notesJson.notes.filter((note) => note.id === clickedNoteID)[0];

    console.log("note", note);

    // windowStatus.setWindowShow({
    //   visible: true,
    //   appName: clickedNoteTitle,
    //   noteDisplay: true,
    //   data: {
    //     id: note.id,
    //     title: clickedNoteTitle,
    //     desc: note.desc,
    //     timestamp: note.timestamp,
    //   },
    // });

    dispatch(
      showWindow({
        visible: true,
        appName: clickedNoteTitle,

        noteDisplay: true,
        data: {
          id: note.id,
          title: clickedNoteTitle,
          desc: note.desc,
          timestamp: note.timestamp,
        },
      })
    );
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await supabase
        .from("notes")
        .select("notes")
        .eq("email_id", user.email);

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

    const fetchTodos = async () => {
      const data = await supabase
        .from("todos")
        .select("todos")
        .eq("email_id", user.email);

      todoContext.setTodos(data.data[0].todos);
    };

    if (user) {
      fetchNotes(user.email);
      fetchTodos();
      console.log("done 💄");
    }

    console.log("index.js windowStatus: ", windowStatus, user);
  }, []);

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {windowStatus.visible && (
        <WindowFrame windowName={windowStatus.appName} visible={true}>
          {windowStatus.appName == "NotesApp" && user && (
            <ul className={styles.ul_list}>
              {notesJson.notes.length === 0 ? (
                <>
                  <p style={{ fontSize: "0.8em" }}>NO FILES FOUND</p>
                </>
              ) : (
                <>
                  {notesJson.notes.map((note) => {
                    if (note.title === undefined) {
                      return (
                        <>
                          <p style={{ fontSize: "0.8em" }}>NO FILES FOUND</p>
                        </>
                      );
                    } else {
                      return (
                        <li key={note.id} data-id={note.id} onClick={viewNote}>
                          <img src="/icons/file_icon.webp" alt="" height={50} />
                          <p>{note.title + ".txt"}</p>
                        </li>
                      );
                    }
                  })}
                </>
              )}
            </ul>
          )}

          {windowStatus.appName == "PomoFocus" && (
            <section className={styles.wrapper}>
              <PomoFocusApp />
            </section>
          )}

          {windowStatus.appName == "user profile" && (
            <section className={styles.wrapper}>
              <MenuProfile />
            </section>
          )}

          {windowStatus.appName == "social handles" && (
            <section className={styles.wrapper}>
              <MenuSocials />
            </section>
          )}

          {windowStatus.appName == "feedback" && (
            <section className={styles.wrapper}>
              <MenuFeedback />
            </section>
          )}
        </WindowFrame>
      )}
      <section className={styles.folder_section}>
        <NoteFolder />
        <PomodoroTimer />
      </section>

      {user ? (
        <Profile
          signOut={signOutBtnHandler}
          signIn={signInBtnHandler}
          name={user && user.nickname}
          profile_url={user && user.picture}
          status={"logged in"}
          statusColor="#99FF00"
        />
      ) : (
        <Profile
          signOut={signOutBtnHandler}
          signIn={signInBtnHandler}
          name={"unknown"}
          status={"not logged in"}
          profile_url={"/assets/default_profile.svg"}
          statusColor="#ff0000"
        />
      )}
    </Layout>
  );
}
