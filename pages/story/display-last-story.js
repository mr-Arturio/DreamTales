import { useState, useEffect } from "react";

const DisplayStoryPage = () => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true); // Define the loading state variable and set it to true initially
  const [generatedImage, setGeneratedImage] = useState(""); // Define the imageUrl state variable and set it to an empty string
  const [isFavourite, setFavourite] = useState(false)

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
  useEffect(() => {
    fetchLastSavedStory();
  }, []);

  async function toggleFavorite(id) {

    const data = {
      id
    }

    try {

      const response = await fetch("/api/favorites-save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Update the favorite status in the local state
        setFavourite()
      } else {
        console.error("Error updating favorites");
      }
    } catch (error) {
      console.error("Error in setting favorites:", error);
    }

  }

  return (
<div>
      <h1>Your Story</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-49 h-49 mb-4 overflow-hidden rounded-full">
            <img
              src={generatedImage}
              alt="Generated Cat"
              className="object-cover w-full h-full"
            />
          </div>
          
          <textarea
            className="w-4/5 h-96 p-4 border rounded-md shadow-lg resize-none"
            rows={50}
            value={story.story}
            readOnly
          />
           <button className={`whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide ${isFavourite ? 'bg-emerald-500 text-white' : 'text-emerald-500'
                  } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                  onClick={() => toggleFavorite(story.id)}>
                  <span className="relative only:-mx-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isFavourite ? 'text-white' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      role="graphics-symbol"
                      aria-labelledby="title-81 desc-81"
                    >
                      <title id="title-81">Favorites</title>
                      <desc id="desc-81">
                        Click to add to favorites page
                      </desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                </button>
        </div>
      )}
    </div>
  );
};

export default DisplayStoryPage;
