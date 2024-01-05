import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";
import PomodoroTimer from "@/components/PomodoroFocus/PomoFocus";
import PomoFocusApp from "@/components/PomodoroFocus/PomoFocusApp";
import Profile from "@/components/Profile/Profile";
import MenuProfile from "@/components/Profile/MenuProfile";
import MenuSocials from "@/components/Profile/MenuSocials";
import MenuFeedback from "@/components/Profile/MenuFeedback";
import { useSelector, useDispatch } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";
import { fetchNotes } from "@/feature/notes/notesDataSlice";
import Spinner from "@/components/Extras/AppleSpinner/Spinner";
import CloudBtn from "@/components/Extras/CloudBtn/CloudBtn";
import SearchBar from "@/components/SearchBar/SearchBar";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

export default function Home({ children }) {
  const windowStatus = useSelector((state) => state.window.windowStatus);
  const notesData = useSelector((state) => state.notes.notesData);
  const todos = useSelector((state) => state.notes.notesData);

  const dispatch = useDispatch();

  const session = useSession(); // tokens
  const { isLoading } = useSessionContext();

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
   console.log(session)
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      <SearchBar />
      {windowStatus.visible && (
        <WindowFrame windowName={windowStatus.appName} visible={true}>
          {windowStatus.appName == "NotesApp" && session && (
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
                      dispatch(fetchNotes(session.user.email));
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

      {session ? (
        <Profile
          name={session && session.user.user_metadata.name}
          profile_url={session && session.user.user_metadata.avatar_url}
          status={"logged in"}
          statusColor="#99FF00"
        />
      ) : (
        <Profile
          name={"unknown"}
          status={"not logged in"}
          profile_url={"/assets/default_profile.svg"}
          statusColor="#ff0000"
        />
      )}
    </Layout>
  );
}
