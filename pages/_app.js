import MainLayout from "../src/components/main-layout";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie] = useState(null);
  useEffect(() => {
    setCookie(localStorage.getItem("UserCookie"));
  }, []);
  return (
    <CookiesProvider>
      <>
        <MainLayout cookies={cookies}>
          <Component {...pageProps} cookies={cookies} setCookie={setCookie} />
        </MainLayout>
      </>
    </CookiesProvider>
  );
}

export default MyApp;
