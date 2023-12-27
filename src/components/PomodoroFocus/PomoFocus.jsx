import React, { useContext, useState } from "react";
import styles from "./PomoFocus.module.css";
import Draggable from "react-draggable";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import { useSelector, useDispatch } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";

const PomoFocus = () => {
  const windowStatus = useSelector((state) => state.windowStatus);
  const dispatch = useDispatch();

  const showWindowFrame = () => {
    if (windowStatus.visible === false) {
      dispatch(
        showWindow({
          visible: true,
          appName: "PomoFocus",

          noteDisplay: false,
          data: {
            id: "",
            title: "",
            desc: "",
            timestamp: "",
          },
        })
      );
    } else if (windowStatus.visible === true) {
      dispatch(
        showWindow({
          visible: true,
          appName: "PomoFocus",

          noteDisplay: false,
          data: {
            id: "",
            title: "",
            desc: "",
            timestamp: "",
          }
        })
      );
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
