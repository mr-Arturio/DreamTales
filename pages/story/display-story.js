import React, { useState } from "react";


const DisplayStoryPage = ({ initialStory }) => {
  const [story, setStory] = useState({});

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
    } catch (error) {
      
    }
   
  }

  // Call the function to fetch the story when the component mounts
  React.useEffect(() => {
    fetchLastSavedStory();
  }, []);

  return (
    <div>
      <h1>Your Story</h1>
      {story ? (
        <textarea rows={50} value={story.story} readOnly />
      ) : (
        <p>No story available.</p>
      )}
    </div>
  );
};

export default DisplayStoryPage;
