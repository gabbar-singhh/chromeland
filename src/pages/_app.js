import { Noto_Sans, Fira_Mono } from "@next/font/google";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "@/lib/supabaseClient";

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
      <Provider store={store}>
        <SessionContextProvider supabaseClient={supabase}>
            <Component {...pageProps} />
        </SessionContextProvider>
      </Provider>
    </main>
  );
}