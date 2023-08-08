import React, { useState } from "react";

const DisplayStoryPage = () => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true); // Define the loading state variable and set it to true initially
  const [generatedImage, setGeneratedImage] = useState(""); // Define the imageUrl state variable and set it to an empty string

  // Function to fetch the last saved story for the user with 'userId' = '1'
  async function fetchLastSavedStory() {
    try {
      const response = await fetch("/api/get-last-saved-story", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("========", data);
      setStory(data.story);
      setGeneratedImage(data.photo); // Set the generatedImage state variable with the fetched image URL
    } catch (error) {
    } finally {
      setLoading(false); // Set loading to false after fetching the story (whether successful or not)
    }
  }

  // Call the function to fetch the story when the component mounts
  React.useEffect(() => {
    fetchLastSavedStory();
  }, []);

  return (
    <div>
      <h1>Your Story</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={generatedImage} alt="Generated Cat" />
          <textarea
            className="w-4/5 h-96 p-4 border rounded-md shadow-lg resize-none"
            rows={50}
            value={story.story} // Access the story text from the story object
            readOnly
          />
        </>
      )}
    </div>
  );
};

export default DisplayStoryPage;
