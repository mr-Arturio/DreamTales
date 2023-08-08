
import { useState } from "react";

// Define an empty array to store generated stories
const initialStories = [];

const SavedStories = () => {
  const [stories, setStories] = useState(initialStories);

  useEffect(() => {
    async function checkLoginStatus(req, res) {
      
      try {
        const response = await fetch("/api/check-login-status", {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
      
        if (!data.isLoggedIn) {
         
          // User is not logged in, redirect to the login page
          router.push("/login"); // Replace with your login page URL
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }

    checkLoginStatus();
  }, []);

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