import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";
import PomodoroTimer from "@/components/PomodoroFocus/PomoFocus";
import PomoFocusApp from "@/components/PomodoroFocus/PomoFocusApp";
import { connectToDatabase } from "@/lib/mongodb/mongodb";

// DON'T REMOVE 👇
import { FirebaseApp } from "firebase/app";

export default function Home({ properties }) {
  const [data, setData] = useState({ name: "", show: false });

  const check_data = (e) => {
    setData(e);
  };

  console.log("🍆🍆", properties);

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {data.show && (
        <WindowFrame windowName={data.name} visible={true}>
          {data.name == "Notes" && (
            <ul>
              {properties.map((user) => {
                return (
                  <span key={user._id} className={styles.note_item}>
                    <img src="/icons/file_icon.webp" alt="" height={50} />
                    <p>{user.name + ".txt"}</p>
                  </span>
                );
              })}
            </ul>
          )}
          {data.name == "PomoFocus" && (
            <section className={styles.wrapper}>
              <PomoFocusApp />
            </section>
          )}
        </WindowFrame>
      )}
      <section className={styles.folder_section}>
        <NoteFolder values={check_data} />
        <PomodoroTimer values={check_data} />
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();

  const data = await db.collection("users").find({}).toArray();

  const properties = JSON.parse(JSON.stringify(data));

  return {
    props: { properties: properties },
  };
};
