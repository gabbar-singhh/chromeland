import React, { useState, useEffect, useContext } from "react";
import styles from "./Todo.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import TodosDataContext from "../ContextAPI/TodosDataContext";

const Todo = () => {
  const todoContext = useContext(TodosDataContext);

  const { user, error, isLoading } = useUser();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // WHEN PAGE OPEN, IT CHECKS FOR PREVIOUS LOCAL-STORAGE
  useEffect(() => {
    if (!isLoading && user) {
      const data = JSON.parse(localStorage.getItem(`localTodo_${user.email}`));
      console.log(data);

      if (data !== null) {
        setTodos(data);
      }
    }
  }, []);

  // WHEN ENTER KEY IS PRESSED
  const keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      if (todo) {
        console.log("-->", todo);
        const newTodo = { id: new Date().getTime().toString(), title: todo };
        setTodos([...todos, newTodo]);
        localStorage.setItem(
          `localTodo_${user.email}`,
          JSON.stringify([...todos, newTodo])
        );
        setTodo("");
      }
    }
  };

  // WHEN DELETE-BTN IS PRESSED
  const deleteItemHandler = (todo) => {
    const deleted = todos.filter((t) => t.id !== todo);
    setTodos(deleted);
    localStorage.setItem(`localTodo_${user.email}`, JSON.stringify(deleted));
  };

  return (
    <main className={styles.container_todo}>
      <div className={styles.input_box}>
        <input
          type="text"
          value={todo}
          onKeyDown={keyDownHandler}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Add a task here..."
        />

        <p>
          you've{" "}
          {!todos.length
            ? "0 task"
            : todos.length === 1
            ? "1 task"
            : todos.length > 1
            ? `${todos.length} tasks`
            : null}{" "}
          to perform
        </p>
      </div>

      <div className={styles.todo_list}>
        {todos.map((todo) => {
          return (
            <span key={todo.id} className={styles.todo_item}>
              <p className={styles.todo_title}>{todo.title}</p>
              <p
                className={styles.todo_del}
                onClick={() => deleteItemHandler(todo.id)}
              >
                {"🟥"}
              </p>
            </span>
          );
        })}
      </div>
    </main>
  );
};

export default Todo;
