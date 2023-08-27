import React, { useState } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import { useUser } from "@auth0/nextjs-auth0/client";

const WindowFrame = (props) => {
  const [show, setShow] = useState(props.show);

  // AUTH CUSTOM HOOKS
  const { user, error, isLoading } = useUser();

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
                <div>
                  <a href="/api/auth/login">
                    SIGN IN WITH GOOGLE TO SAVE NOTES
                  </a>
                </div>
              ) : (
                <>
                  <p>No Notes Found!</p>
                  <a href="/api/auth/logout">logout</a>
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
