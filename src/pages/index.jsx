import React, { useState, useEffect } from "react";
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
import axios from "axios";

// DON'T REMOVE 👇
import { FirebaseApp } from "firebase/app";

export default function Home({ properties, isConnected }) {
  const [data, setData] = useState({ name: "", show: false });

  const [userData, setUserData] = useState([]);

  const check_data = (e) => {
    setData(e);
  };

  useEffect(() => {
    // async () => {
    //   const data = await fetch("/api/properties/");
    //   const resultsJSON = await data.json();
    //   console.log("💀", resultsJSON);
    //   setUserData(resultsJSON);
    // };

    axios
      .get("https://chromeland-v1.vercel.app/api/properties")
      .then(function (response) {
        // handle success
        setUserData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    console.log("🐕‍🦺🐕‍🦺", userData);
  }, []);

  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      {data.show && (
        <WindowFrame windowName={data.name} visible={true}>
          {data.name == "Notes" && (
            <ul>
              {userData.map((user) => {
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
  // const { db } = await connectToDatabase();

  // const data = await db.collection("users").find({}).toArray();

  // const properties = JSON.parse(JSON.stringify(data));

  try {
    await connectToDatabase();

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
