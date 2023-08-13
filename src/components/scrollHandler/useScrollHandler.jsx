import { useState, useEffect } from 'react';

function UseScrollHandler() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [footerVisible, setFooterVisible] = useState(true);
  let scrollTimeout;

  const handleScroll = () => {
    clearTimeout(scrollTimeout);

    const currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
    setPrevScrollPos(currentScrollPos);

    scrollTimeout = setTimeout(() => {
      setFooterVisible(true);
    }, 5000); // Adjust the delay as needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return footerVisible;
}

export default UseScrollHandler;