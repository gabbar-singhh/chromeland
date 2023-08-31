import React, { useState } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import Link from "next/link";
import CloudBtn from "../Buttons/CloudBtn/CloudBtn";

const WindowFrame = ({ children, windowName, visible }) => {
  const [show, setShow] = useState(visible);
  const [notes, setNotes] = useState([]);

  const closeWindow = () => {
    setShow(false);
  };

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
              {
                // !user && <CloudBtn href="/api/auth/login/" txt="SIGN IN" />
                /* <div className={styles.notes_list}>
                    {notes.map((element) => {
                      return (
                        <span key={element.id} className={styles.note_item}>
                          <img src="/icons/file_icon.webp" alt="" height={50} />
                          <p>{element.title + ".txt"}</p>
                        </span>
                      );
                    })}
                  </div> */
              }
              {/* {user && <>{children}</>} */}
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
