import React, { useState, useEffect } from "react";
import styles from "./PomoFocus.module.css";
import CloudBtn from "../Buttons/CloudBtn/CloudBtn";
import { Howl } from "howler";

const PomoFocusApp = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);

  // DEFAULT UNDERLINE TO POMODORO
  const [activeLi, setActiveLi] = useState("pomodoro");

  const [btnText, setBtnText] = useState("start");

  const handleItemClick = (data) => {
    setActiveLi(data);
  };

  useEffect(() => {
    let timerInterval;

    if (timerActive && timeRemaining > 0) {
      timerInterval = setInterval(() => {
        setBtnText("reset");
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // THROW YOUR NOTIFICATION CODE HERE!
      const sound = new Howl({
        src: ["/audio/pomodoro_timer.mp3"],
        autoplay: true,
        volume: 0.5,
      });
      setBtnText("start");
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerActive, timeRemaining]);

  const startTimer = () => {
    setTimerActive(true);

    if (btnText == "reset" && activeLi == "pomodoro") {
      setTimeRemaining(25 * 60);
      setTimerActive(false);
      setBtnText("start");
    } else if (btnText == "reset" && activeLi == "short") {
      setTimeRemaining(5 * 60);
      setTimerActive(false);
      setBtnText("start");
    } else if (btnText == "reset" && activeLi == "long") {
      setTimeRemaining(15 * 60);
      setTimerActive(false);
      setBtnText("start");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const SWITCH_MODE = (element) => {
    const elementType = element.target.getAttribute("data-type");

    if (elementType == "short") {
      handleItemClick("short");
      setTimeRemaining(5 * 60);
    } else if (elementType == "long") {
      handleItemClick("long");
      setTimeRemaining(15 * 60);
    } else if (elementType == "pomodoro") {
      handleItemClick("pomodoro");
      setTimeRemaining(25 * 60);
    }
  };

  const sendMessageNotification = (message) => {
    const channel = new BroadcastChannel("notification-channel");
    channel.postMessage(message);
  };

  return (
    <div className={styles.container_pomofocus_app}>
      <div className={styles.pomofocus_topbar}>
        <ul>
          <li
            className={`${styles.li_pomodoro} ${
              activeLi === "pomodoro" ? styles.active_li : ""
            }`}
            data-type="pomodoro"
            onClick={SWITCH_MODE}
          >
            Pomodoro
          </li>
          <li
            className={`${styles.li_shortbreak} ${
              activeLi === "short" ? styles.active_li : ""
            }`}
            data-type="short"
            onClick={SWITCH_MODE}
          >
            Short Break
          </li>
          <li
            className={`${styles.li_longbreak} ${
              activeLi === "long" ? styles.active_li : ""
            }`}
            data-type="long"
            onClick={SWITCH_MODE}
          >
            Long Break
          </li>
        </ul>
      </div>
      <div className={styles.pomofocus_timer}>{formatTime(timeRemaining)}</div>
      <div className={styles.pomofocus_btn}>
        <CloudBtn txt={btnText} onClick={startTimer} href="" />
      </div>
    </div>
  );
};

export default PomoFocusApp;
