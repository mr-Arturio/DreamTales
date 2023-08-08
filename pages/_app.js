import MainLayout from "../src/components/main-layout";
import '../styles/globals.css';
// import { SessionProvider} from 'next-auth/react'
// import { AppProps } from "next/app";
import {CookiesProvider} from 'react-cookie'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
    </CookiesProvider>
  );
}

export default MyApp;