import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Draggable from "react-draggable";
import Time from "@/components/Time/Time";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Time />
    </Layout>
  );
}