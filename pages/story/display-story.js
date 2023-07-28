import React from "react";
import { useRouter } from "next/router";

const DisplayStoryPage = () => {
  const router = useRouter();
  const { result } = router.query; // Get the generated story from the URL query params

  return (
    <div>
      <h1>Generated Story</h1>
      <textarea rows={50} value={result} readOnly />
    </div>
  );
};

export default DisplayStoryPage;