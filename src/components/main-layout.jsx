import React from 'react';
import { Footer } from './footer';
import { Header } from './header';

const MainLayout = ({ children, loading }) => {
  return (
    <>
      <Header />
      <main>
        {loading && <LoadingScreen />} {/* Conditionally render LoadingScreen */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;