import MainLayout from "../src/components/main-layout";
import '../styles/general.sass';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;