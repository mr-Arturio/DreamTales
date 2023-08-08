import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-blue-900 text-white">
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
