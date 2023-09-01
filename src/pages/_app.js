import "@/styles/globals.css";
import { Noto_Sans, Fira_Mono } from "@next/font/google";

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const FiraMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function App({ Component, pageProps }) {
  

  return (
    <main className={`${NotoSans.className} ${FiraMono.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
