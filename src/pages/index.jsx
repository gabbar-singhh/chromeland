import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState({ name: "", show: false });

  const check_data = (e) => {
    setData(e);
    console.log("🙂", e);
  };

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {data.show && <WindowFrame show={true} />}
      <section className={styles.folder_section}>
        <NoteFolder values={check_data} />
      </section>
    </Layout>
  );
}
