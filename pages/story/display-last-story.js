import { useState, useEffect } from "react";
import Image from "next/image";

const DisplayStoryPage = () => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState("");
  const [title, setTitle] = useState("");

  async function fetchLastSavedStory() {
    try {
      const response = await fetch("/api/get-last-saved-story", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTitle(data.title);
      setStory(data.story);
      setGeneratedImage(data.photo);
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLastSavedStory();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">{title.title}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
<div className="flex flex-row justify-evenly lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0">
  <div className="w-full lg:w-3/5 p-4 border rounded-md shadow-lg" style={{ fontFamily: "Garet, sans-serif", fontSize: "1.4rem", marginTop: "2rem" }}>
    <div className="float-right mr-4 mb-4 lg:mb-0 lg:mr-0">
      <Image
        src={generatedImage}
        alt="Story Image"
        width={600}
        height={150}
        className="overflow-hidden"
      />
    </div>
    <p>{story.story}</p>
  </div>
</div>

      )}
    </div>
  );
};

export default DisplayStoryPage;
