import React, { useState, useEffect } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";

const WindowFrame = (props) => {
  const [show, setShow] = useState(props.show);
  
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
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
