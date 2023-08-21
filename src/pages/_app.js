import "@/styles/globals.css";
import Head from "next/head";
import { Fira_Code } from "@next/font/google";

const fira_code = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={fira_code.className}>
      <Component {...pageProps} />
    </main>
  );
}
