import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const [data, setData] = useState({ name: "", show: false });

  // AUTH CUSTOM HOOKS
  const { user, error, isLoading } = useUser();

  const check_data = (e) => {
    setData(e);
    console.log("🙂", e);
  };

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {data.show && <WindowFrame show={true}>we we 🥵</WindowFrame>}
      <section className={styles.folder_section}>
        <NoteFolder values={check_data} />
      </section>
    </Layout>
  );
}
