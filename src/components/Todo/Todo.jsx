import React, { useState, useEffect, useContext } from "react";
import styles from "./Todo.module.css";
import Draggable from "react-draggable";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import TodosDataContext from "../ContextAPI/TodosDataContext";
import { da } from "date-fns/locale";
import { isValid } from "@/utility/isValid";
import { isEmpty } from "lodash";

const Todo = () => {
  const [task, setTask] = useState("");

  const todoContext = useContext(TodosDataContext);
  const { user, error, isLoading } = useUser();

  const insertDataToTodosTable = async (email) => {
    const insertEmptyData = await supabase
      .from("todos")
      .insert([
        {
          todos: [],
          email_id: email,
        },
      ])
      .select();

    console.log("😂😂😂", insertEmptyData.data[0].todos);
  };

  // GETTING LATEST UPADTED NOTES JSON
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

  async function appendTasksToJSON(existingTasks, newTask) {
    const updatedData = [...existingTasks, { ...newTask }];
    return updatedData;
  }

  async function fetchAndUpdateTodo() {
    const timestamp = new Date().toISOString();

    const existingTasks = await fetchLatestTodos();

    const newTask = {
      id: new Date().getTime().toString(),
      title: task.trim(),
    };

    const updatedData = await appendTasksToJSON(existingTasks, newTask);

    const updated = await sendTodo(updatedData);

    console.log(":: ", updated);

    if (updated) {
      todoContext.setTodos(updated);
      setTask("");
    }
  }

  const sendTodo = async (updatedData) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ todos: updatedData })
      .eq("email_id", user.email)
      .select();

    if (error) {
      console.error("Error updating user todos:", error.message);
      return false;
    }

    return data[0].todos;
  };

  // WHEN ENTER KEY IS PRESSED
  const keyDownHandler = async (event) => {
    console.log("todoContext.todos: ", todoContext.todos.length);
    // if enterkey is pressed!
    if (event.keyCode === 13) {
      if (!isEmpty(task) && !isEmpty(task.trim())) {
        // CHECKING IF AN EMPTY JSON OBJ EXISTS OR NOT, IF NOT IT WILL CREATE ONE
        const { data, error } = await supabase
          .from("todos")
          .select("todos")
          .eq("email_id", user.email);

        if (error) {
          console.error("Error fetching user todos:", error.message);
          return null;
        }

        console.log("data[0].todos", data.length, data);

        if (data.length === 0) {
          // IT WILL CREATE A ROW IN notes TABLE WITH EMPTY JSON
          insertDataToTodosTable(user.email);
          fetchAndUpdateTodo();
        } else {
          fetchAndUpdateTodo();
        }
      }
    }
  };

  return (
    <Draggable>
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
            {!todoContext.todos.length
              ? "no tasks"
              : todoContext.todos.length === 1
              ? "only 1 task"
              : todoContext.todos.length > 1
              ? `${todoContext.todos.length} tasks`
              : null}{" "}
            to perform
          </p>
        </div>

        <div className={styles.todo_list}>
          {todoContext.todos.map((task) => {
            return (
              <span key={task.id} className={styles.todo_item}>
                <p className={styles.todo_title}>{task.title}</p>
                <p
                  className={styles.todo_del}
                  onClick={() => deleteItemHandler(task.id)}
                >
                  {"🟥"}
                </p>
              </span>
            );
          })}
        </div>
      </main>
    </Draggable>
  );
};

export default Todo;
