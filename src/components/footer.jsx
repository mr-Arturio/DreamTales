import UseScrollHandler from "./scrollHandler/useScrollHandler";

export const Footer = () => {
  const footerVisible = UseScrollHandler();
  return (
  <footer className={footerVisible ? 'visible' : 'hidden'}>
    <p> © 2023 DreamTale Project - A Project Built by </p>
  </footer>
);
  }