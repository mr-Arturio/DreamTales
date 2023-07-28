import React from "react";
import { useRouter } from "next/router";

const DisplayStoryPage = () => {
  const router = useRouter();
  const { result } = router.query; // Get the generated story from the URL query params

  return (
    <div>
      <h1>Your Story</h1>
      {result ? (
        <textarea rows={50} value={result} readOnly />
      ) : (
        <p>No story available.</p>
      )}
    </div>
  );
};

export default DisplayStoryPage;