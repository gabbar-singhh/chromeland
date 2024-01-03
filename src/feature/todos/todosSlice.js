import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "TODOS",
  initialState,
  reducers: {
    fetchTodosFromLocalStorage: (state, action) => {
      state.todos = JSON.parse(localStorage.getItem(`TODOS`));
    },

    saveTodo: (state, action) => {
      const title = action.payload.todo.trim();

      const newTodo = {
        id: new Date().getTime().toString(),
        title: title,
      };

      state.todos.push(newTodo);
      localStorage.setItem(`TODOS`, JSON.stringify(state.todos));
    },

    deleteTodo: (state, action) => {
      const todoID = action.payload.todoID;
      state.todos = state.todos.filter((todo) => todo.id !== todoID);

      localStorage.setItem(`TODOS`, JSON.stringify(state.todos));
    },
  },
});

export const { fetchTodosFromLocalStorage, saveTodo, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;