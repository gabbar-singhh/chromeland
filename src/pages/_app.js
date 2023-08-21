import "@/styles/globals.css";
import { Noto_Sans } from "@next/font/google";

const fira_code = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={fira_code.className}>
      <Component {...pageProps} />
    </main>
  );
}
