import { Noto_Sans, Fira_Mono } from "@next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";

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
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </main>
  );
}