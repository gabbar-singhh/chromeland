import React, { useContext, useState } from "react";
import styles from "./PomoFocus.module.css";
import Draggable from "react-draggable";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";

const PomoFocus = () => {
  const windowStatus = useContext(WindowStatusContext);

  const showWindowFrame = () => {
    if (windowStatus.windowShow.visible === false) {
      windowStatus.setWindowShow({
        visible: true,
        appName: "PomoFocus",
      });
    } else if (windowStatus.windowShow.visible === true) {
      windowStatus.setWindowShow({
        visible: false,
        appName: "PomoFocus",
      });
    }
  };
  return (
    <>
      <Draggable>
        <main className={styles.container_pomofocus} onClick={showWindowFrame}>
          <img
            src="/icons/timer.png"
            height={"58px"}
            width={"auto"}
            alt="pomofocus icon"
          />
          <p>Pomo Focus</p>
        </main>
      </Draggable>
    </>
  );
};

export default PomoFocus;
