import { useState, useEffect } from "react";

const useTextAnimation = (text, charactersToShow, delay) => {
  const [animatedText, setAnimatedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text?.length) {
      setTimeout(() => {
        const endIndex = Math.min(currentIndex + charactersToShow, text.length);
        setAnimatedText((prevText) => prevText + text.slice(currentIndex, endIndex));
        setCurrentIndex((prevIndex) => prevIndex + charactersToShow);
      }, delay);
    }
  }, [currentIndex, text, charactersToShow, delay]);

  return animatedText;
};

export default useTextAnimation;
