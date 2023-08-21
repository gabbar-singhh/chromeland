import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout/Layout";
import Time from "@/components/Time/Time";
import Todo from "@/components/Todo/Todo";

export default function Home() {
  return (
    <Layout>
      <Time />
      <Todo />
    </Layout>
  );
}
