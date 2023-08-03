// pages/index.js
import React, { useState } from "react";

export default function RangeSlider() {
  const [sliderValue, setSliderValue] = useState(2);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <div className="slidecontainer">
      <input
        type="range"
        min="1"
        max="10"
        value={sliderValue}
        className="slider"
        onChange={handleSliderChange}
      />
      <div className="mt-1 text-center text-lg font-semibold">
        Age: {sliderValue}
      </div>
    </div>
  );
}
