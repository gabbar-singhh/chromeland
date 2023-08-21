import React, { useEffect, useState } from "react";
import styles from "./Time.module.css";
import { format } from "date-fns";

const Time = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDateOfMonth, setCurrentDateOfMonth] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const currentDate = new Date();
      setCurrentTime(format(currentDate, "hh:mm"));
      setCurrentDay(format(currentDate, "EEEE"));
      setCurrentMonth(format(currentDate, "MMMM"));
      setCurrentDateOfMonth(format(currentDate, "d"));
    };

    updateTimeAndDate();

    const intervalId = setInterval(updateTimeAndDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container_time}>
      <span className={styles.current_time}>{currentTime}</span>
      <span className={styles.current_day}>
        {currentDay}, {currentMonth} {currentDateOfMonth}
      </span>
    </div>
  );
};

export default Time;
