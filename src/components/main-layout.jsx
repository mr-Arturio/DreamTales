import React from 'react';
import { Footer } from './footer';
import { Header } from './header';

const MainLayout = ({ children, loading, cookies }) => {
  return (
    <>
      <Header cookies = {cookies} />
      <main>
        {loading && <LoadingScreen />} {/* Conditionally render LoadingScreen */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;