import React, { useState, useEffect } from "react";
import styles from "./Todo.module.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // WHEN PAGE OPEN, IT CHECKS FOR PREVIOUS LOCAL-STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("localTask"));
    console.log(data);

    if (data !== null) {
      setTasks(data);
    }
  }, []);

  // WHEN ENTER KEY IS PRESSED
  const keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      if (task) {
        console.log("-->", task);
        const newTask = { id: new Date().getTime().toString(), title: task };
        setTasks([...tasks, newTask]);
        localStorage.setItem("localTask", JSON.stringify([...tasks, newTask]));
        setTask("");
      }
    }
  };

  // WHEN DELETE-BTN IS PRESSED
  const deleteItemHandler = (task) => {
    const deleted = tasks.filter((t) => t.id !== task);
    setTasks(deleted);
    localStorage.setItem("localTask", JSON.stringify(deleted));
  };
  return (
    <main className={styles.container_todo}>
      <div className={styles.input_box}>
        <input
          type="text"
          value={task}
          onKeyDown={keyDownHandler}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Add a task here..."
        />
        <p>
          You have{" "}
          {!tasks.length
            ? " 0 task"
            : tasks.length === 1
            ? "only 1 task"
            : tasks.length > 1
            ? `${tasks.length} tasks`
            : null}
          to pending!
        </p>
      </div>

      <div className={styles.todo_list}>
        {tasks.map((task) => {
          return (
            <span key={task.id} className={styles.todo_item}>
              <p className={styles.todo_title}>{task.title}</p>
              <p
                className={styles.todo_del}
                onClick={() => deleteItemHandler(task.id)}
              >
                {"🔴"}
              </p>
            </span>
          );
        })}
      </div>
    </main>
  );
};

export default Todo;
