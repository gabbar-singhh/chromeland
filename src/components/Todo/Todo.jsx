import React, { useState, useEffect } from "react";
import styles from "./Todo.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { saveTodo, deleteTodo } from "@/feature/todos/todosSlice";
import { fetchTodosFromLocalStorage } from "@/feature/todos/todosSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const { user, error, isLoading } = useUser();

  const [currentTodo, setCurrentTodo] = useState("");

  const keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      dispatch(saveTodo({ todo: currentTodo }));
      setCurrentTodo("");
    }

    console.log(todos.length);
  };

  useEffect(() => {
    console.log(localStorage.getItem("TODOS"), "==");
    dispatch(fetchTodosFromLocalStorage());
  }, []);

  return (
    <main className={styles.container_todo}>
      <div className={styles.input_box}>
        <input
          type="text"
          value={currentTodo}
          onKeyDown={keyDownHandler}
          onChange={(event) => setCurrentTodo(event.target.value)}
          placeholder="Add a task here..."
        />

        <p>
          you've{" "}
          {todos === null
            ? "0 tasks"
            : !todos.length
            ? "0 tasks"
            : todos.length === 1
            ? "1 task"
            : `${todos.length} tasks`}{" "}
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
                onClick={() => dispatch(deleteTodo({ todoID: todo.id }))}
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
