
import { useState } from "react";

// Define an empty array to store generated stories
const initialStories = [];

const SavedStories = () => {
  const [stories, setStories] = useState(initialStories);

  // Add a function to handle adding new stories to the list
  const addStory = (story) => {
    setStories([...stories, story]);
  };

  return (
    <div>
      <h1>Your Saved Stories</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur cupiditate quaerat ipsum aperiam! Explicabo provident saepe temporibus rem sint itaque corporis sed harum, dignissimos facilis culpa atque voluptate numquam odio?</p>
    </div>
  );
};

export default SavedStories;