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
import TodosDataContext from "@/components/ContextAPI/TodosDataContext";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import Profile from "@/components/Profile/Profile";
import MenuProfile from "@/components/Profile/MenuProfile";
import MenuSocials from "@/components/Profile/MenuSocials";
import MenuFeedback from "@/components/Profile/MenuFeedback";
import { useSelector, useDispatch } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";
import { fetchNotes } from "@/feature/notes/notesDataSlice";
import Spinner from "@/components/Extras/AppleSpinner/Spinner";
import CloudBtn from "@/components/Extras/CloudBtn/CloudBtn";

export default function Home({ children }) {
  const todoContext = useContext(TodosDataContext);

  const windowStatus = useSelector((state) => state.window.windowStatus);
  const notesData = useSelector((state) => state.notes.notesData);
  const dispatch = useDispatch();

  // AUTH0
  const { user, error, isLoading } = useUser();

  // TEMP FUNCTION
  const signOutBtnHandler = async () => {
    console.log("SIGN OUT FXN IN CALLED!");

    const isFinished = await window.open("/api/auth/logout");

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
    const note = notesData.data.filter((note) => note.id === clickedNoteID)[0];

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
    const fetchTodos = async () => {
      const data = await supabase
        .from("todos")
        .select("todos")
        .eq("email_id", user.email);

      todoContext.setTodos(data.data[0].todos);
    };

    if (user) fetchTodos();
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
              {/* UNITIL IT'S FETCHING NOTES */}
              {notesData.isLoading && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Spinner />
                </span>
              )}
              {/* IF THERE'S AN ERROR */}
              {notesData.isError && (
                <div className={styles.notesError}>
                  <p>Something Went Wrong! </p>
                  <CloudBtn
                    txt="try again"
                    href=""
                    onClick={() => {
                      dispatch(fetchNotes(user.email));
                    }}
                  />
                </div>
              )}
              {/* IF LENGTH OF DATA IS 0 */}
              {notesData.data && notesData.data.length === 0 ? (
                <p style={{ fontSize: "0.8em" }}>NO FILES FOUND</p>
              ) : (
                <>
                  {notesData.data &&
                    notesData.data.map((note) => {
                      return (
                        <li key={note.id} data-id={note.id} onClick={viewNote}>
                          <img src="/icons/file_icon.webp" alt="" height={50} />
                          <p>{note.title + ".txt"}</p>
                        </li>
                      );
                    })}
                </>
              )}
              {notesData.data === undefined && <p>DATA IS UNDEFINED</p>}
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
