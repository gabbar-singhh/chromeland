import "@/styles/globals.css";
import { Noto_Sans, Fira_Mono } from "@next/font/google";
import { useState } from "react";
import WindowStatusContext from "@/components/ContextAPI/WindowStatusContext";
import NotesDataContext from "@/components/ContextAPI/NotesDataContext";
import TodosDataContext from "@/components/ContextAPI/TodosDataContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import { store } from "@/app/store";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const FiraMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function App({ Component, pageProps }) {
  const [windowShow, setWindowShow] = useState({
    visible: false,
    appName: "none",
    noteDisplay: false,
    data: {
      id: "",
      title: "",
      desc: "",
      timestamp: "",
    },
  });

  const [notes, setNotes] = useState([{ notes: [] }]);

  const [todos, setTodos] = useState([{ todos: [] }]);

  return (
    <main className={`${NotoSans.className} ${FiraMono.className}`}>
      <Provider store={store}>
      <UserProvider>
            <NotesDataContext.Provider value={{ notes, setNotes }}>
              <TodosDataContext.Provider value={{ todos, setTodos }}>
                <Component {...pageProps} />
              </TodosDataContext.Provider>
            </NotesDataContext.Provider>
      </UserProvider>
      </Provider>
    </main>
  );
}