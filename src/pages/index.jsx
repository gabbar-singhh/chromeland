import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";
import NoteFolder from "@/components/NoteFolder/NoteFolder";
import WindowFrame from "@/components/WindowFrame/WindowFrame";

export default function Home() {
  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
      <WindowFrame />
      <section className={styles.folder_section}>
        <NoteFolder />
      </section>
    </Layout>
  );
}
