import { useState, useEffect } from "react";
import Image from "next/image";
import useTextAnimation from "@/src/components/textAnimation/useTextAnimation";

const DisplayStoryPage = () => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState("");
  const [title, setTitle] = useState("");
  const [isFavourite, setFavourite] = useState(false);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLastSavedStory();
  }, []);

  //text animation settings
  const charactersToShow = 5; // number of characters to show
  const animationDelay = 50; // adjust the timing for the animation
  const animatedText = useTextAnimation(
    story.story,
    charactersToShow,
    animationDelay
  );

  async function toggleFavorite(id) {
    const data = {
      id,
    };
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
        setFavourite();
      } else {
        console.error("Error updating favorites");
      }
    } catch (error) {
      console.error("Error in setting favorites:", error);
    }
  }

  return (
    <div
      className="flex flex-col items-center p-6 bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: 'url("/docs/design/Backgrounds/last.svg")' }}
    >
      <h1 className="text-4xl font-bold font-comic-sans mt-10 mb-5">
        {title.title}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row justify-evenly mb-10 lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0">
          <div
            className="w-full lg:w-4/5 p-4 border rounded-md shadow-lg bg-cover bg-center bg-no-repeat bg-slate-200"
            style={{
              fontFamily: "Garet, sans-serif",
              fontSize: "1.4rem",
              marginTop: "2rem",
            }}
          >
            <div className="float-right mr-4 mb-4 lg:mb-0 lg:mr-0">
              <Image
                src={generatedImage}
                alt="Story Image"
                width={600}
                height={150}
                className="overflow-hidden ml-7 mb-3"
              />
            </div>
            <p>{animatedText}</p>

            <button
              className={`whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide ${
                isFavourite ? "bg-emerald-500 text-white" : "text-emerald-500"
              } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
              onClick={() => toggleFavorite(story.id)}
            >
              <span className="relative only:-mx-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isFavourite ? "text-white" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="graphics-symbol"
                  aria-labelledby="title-81 desc-81"
                >
                  <title id="title-81">Favorites</title>
                  <desc id="desc-81">Click to add to favorites page</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayStoryPage;
