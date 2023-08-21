import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";
import Notes from "@/components/Notes/Notes";

export default function Home() {
  return (
    <Layout>
      <Time />
      <Todo />
      <Notes />
    </Layout>
  );
}
