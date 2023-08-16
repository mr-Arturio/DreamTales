import UseScrollHandler from "./scrollHandler/useScrollHandler";

export const Footer = () => {
  const footerVisible = UseScrollHandler();
  return (
    <footer className={footerVisible ? "visible" : "hidden"}>
      <p> © 2023 DreamTales Project - Built by <a href="https://github.com/mr-Arturio"> Artur</a> and <a href="https://github.com/osuntol">Rotimi</a></p>
    </footer>
  );
};
