import React, { useState, useEffect } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

const WindowFrame = (props) => {
  const [show, setShow] = useState(props.show);
  const [notes, setNotes] = useState([]);

  // AUTH CUSTOM HOOKS
  const { user, error, isLoading } = useUser();

  const closeWindow = () => {
    setShow(false);
  };

  // WHEN PAGE OPEN, IT CHECKS FOR PREVIOUS LOCAL-STORAGE
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("localNotes"));

  //   setNotes(data);
  //   console.log(data);
  // }, []);

  return (
    <>
      {show && (
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

              <p>Sticky Notes</p>

              <div className={styles.black_lines}>
                <div className={styles.line_1}></div>
                <div className={styles.line_2}></div>
                <div className={styles.line_3}></div>
                <div className={styles.line_4}></div>
                <div className={styles.line_4}></div>
              </div>
            </div>

            <div className={styles.data_container}>
              {!user ? (
                <div className={styles.signin_btn}>
                  <Link href="/api/auth/login" className={styles.link_sign}>
                    SIGN IN TO SAVE
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.notes_list}>
                    {/* {notes.map((element) => {
                      return (
                        <span key={element.id} className={styles.note_item}>
                          <img src="/icons/file_icon.webp" alt="" height={50} />
                          <p>{element.title + ".txt"}</p>
                        </span>
                      );
                    })} */}
                  </div>
                </>
              )}
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
