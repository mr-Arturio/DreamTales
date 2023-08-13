// pages/index.js
import React, { useState } from "react";

export default function RangeSlider({ label, sliderValue, setSliderValue, min, max, step }) {
  // const [sliderValue, setSliderValue] = useState(parseFloat(initialValue));

  const handleSliderChange = (e) => {
    setSliderValue(parseFloat(e.target.value));
    console.log('000000009999', e);
  };

  return (
    <div className="slidecontainer">
    <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={sliderValue}
    className="slider"
    onChange={handleSliderChange}
  />
      <div className="mt-1 text-left text-lg font-semibold">
      {label}: {sliderValue}
      </div>
    </div>
  );
}
