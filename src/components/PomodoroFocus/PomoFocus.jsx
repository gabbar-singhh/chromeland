import React, { useState } from "react";
import styles from "./PomoFocus.module.css";
import Draggable from "react-draggable";

const PomoFocus = ({ values }) => {
  const [prevData, setPrevData] = useState({ name: "PomoFocus", show: false });

  const showWindowFrame = () => {
    if (prevData.show === false) {
      values({
        name: "PomoFocus",
        show: true,
      });
      setPrevData({
        name: "PomoFocus",
        show: true,
      });
    } else if (prevData.show === true) {
      values({
        name: "PomoFocus",
        show: false,
      });
      setPrevData({
        name: "PomoFocus",
        show: false,
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