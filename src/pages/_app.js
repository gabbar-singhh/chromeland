import "@/styles/globals.css";
import { Noto_Sans, Fira_Mono } from "@next/font/google";
import { useState } from "react";
import UserAuthContext from "@/components/ContextAPI/UserAuthContext";
import WindowStatusContext from "@/components/ContextAPI/WindowStatusContext";
import NotesDataContext from "@/components/ContextAPI/NotesDataContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const FiraMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function App({ Component, pageProps }) {
  const [userAuthDetail, setUserAuthDetail] = useState({
    credential: "",
    token: "",
    displayName: "",
    email: "",
    photoURL: "",
    isLoggedIn: false,
  });

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

  return (
    <main className={`${NotoSans.className} ${FiraMono.className}`}>
        <UserProvider>
        <WindowStatusContext.Provider value={{ windowShow, setWindowShow }}>
          <UserAuthContext.Provider
            value={{ userAuthDetail, setUserAuthDetail }}
          >
            <NotesDataContext.Provider value={{ notes, setNotes }}>
              <Component {...pageProps} />
            </NotesDataContext.Provider>
          </UserAuthContext.Provider>
        </WindowStatusContext.Provider>
    </UserProvider>
      </main>
  );
}
