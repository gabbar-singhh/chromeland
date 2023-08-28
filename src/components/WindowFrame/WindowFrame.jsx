import React, { useState } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

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
                <div className={styles.signin_btn}>
                  <Link href={"/api/auth/login"} className={styles.link_sign}>
                    SIGN IN TO SAVE
                  </Link>
                </div>
              ) : (
                <>
                  <p>No Notes Found!</p>
                  <br />
                  <Link href="/api/auth/logout">logout</Link>
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
