import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import LoadingScreen from "./loading-screen";

const MainLayout = ({ children, loading, cookies }) => {
  return (
    <>
      <Header cookies={cookies} />
      <main>
        {/* Conditionally render LoadingScreen */}
        {loading && <LoadingScreen />} {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
