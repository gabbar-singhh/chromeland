import React, { useState, useEffect, useContext } from "react";
import styles from "./Todo.module.css";
import Draggable from "react-draggable";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import TodosDataContext from "../ContextAPI/TodosDataContext";
import { da } from "date-fns/locale";
import { isValid } from "@/utility/isValid";
import { isEmpty } from "lodash";
import Spinner from "../Extras/Spinner/Spinner";

const Todo = () => {
  const todoContext = useContext(TodosDataContext);

  const { user, error, isLoading } = useUser();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [syncMessage, setSyncMessage] = useState("sync todos");

  // WHEN PAGE OPEN, IT CHECKS FOR PREVIOUS LOCAL-STORAGE
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("localTodo"));
  //   console.log(data);

  //   if (data !== null) {
  //     setTodos(data);
  //   }
  // }, []);

  // 🔴🔴 SYNC MESSAGE TEXT INDICATOR
  async function fetchExistingTodos(email) {
    const { data, error } = await supabase
      .from("todos")
      .select("todos")
      .eq("email_id", email);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }

    return data[0].todos || {};
  }

  // WHEN ENTER KEY IS PRESSED
  const keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      if (todo) {
        console.log("-->", todo);
        const newTodo = { id: new Date().getTime().toString(), title: todo };
        setTodos([...todos, newTodo]);
        localStorage.setItem("localTodo", JSON.stringify([...todos, newTodo]));
        setTodo("");
      }
    }
  };

  // WHEN DELETE-BTN IS PRESSED
  const deleteItemHandler = (todo) => {
    const deleted = todos.filter((t) => t.id !== todo);
    setTodos(deleted);
    localStorage.setItem("localTodo", JSON.stringify(deleted));
  };

  const insertEmptyJsonToTodosTable = async (email) => {
    const insertData = await supabase
      .from("todos")
      .insert([
        {
          todos: [],
          email_id: email,
        },
      ])
      .select();
  };

  async function fetchLatestTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("todos")
      .eq("email_id", user.email);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }

    return data[0].todos || {};
  }

  const sendTodos = async (updatedData) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ todos: updatedData })
      .eq("email_id", user.email)
      .select();

    if (error) {
      console.error("Error updating user data:", error.message);
      return false;
    }

    return data[0].todos | {};
  };

  const syncDataHandler = async () => {
    if (todos.length === 0) {
      setSyncMessage("syncing todos");
      const existingTodos = await fetchExistingTodos(user.email);
      setTodos(existingTodos);
      setSyncMessage("sync todos");
    }

    if (todos.length > 0) {
      setSyncMessage("syncing todos");
      console.log("dman kaul!", user.email, todos);

      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("email_id", user.email);

      insertEmptyJsonToTodosTable(user.email);

      const updated = await sendTodos(todos);

      setSyncMessage("sync todos");
    }
  };

  return (
    // <Draggable>
    <main className={styles.container_todo}>
      <div className={styles.input_box}>
        <input
          type="text"
          value={todo}
          onKeyDown={keyDownHandler}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Add a task here..."
        />

        <span
          className={styles.sync_box}
          onClick={() => console.log("you clicked sync box!")}
        >
          <img src="/icons/sync-icon.svg" height={10} alt="" />
          <p onClick={syncDataHandler}>{syncMessage}</p>
        </span>

        <p>
          You've currently{" "}
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
    // </Draggable>
  );
};

export default Todo;
