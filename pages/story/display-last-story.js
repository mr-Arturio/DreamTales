import { useState, useEffect } from "react";
import Image from "next/image";
import useTextAnimation from "@/src/components/textAnimation/useTextAnimation";

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
  const animatedText = useTextAnimation(story.story, charactersToShow, animationDelay);

  return (
    <div className="flex flex-col items-center p-6 bg-cover bg-center bg-no-repeat min-h-screen"     style={{
      backgroundImage:
        'url("/docs/design/Backgrounds/last.svg")'}}>
      <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "Garet, sans-serif"}}>{title.title}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row justify-evenly lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0">
          <div className="w-full lg:w-3/5 p-4 border rounded-md shadow-lg  bg-cover bg-center bg-no-repeat bg-slate-200" style={{ fontFamily: "Garet, sans-serif", fontSize: "1.4rem", marginTop: "2rem" }}>
            <div className="float-right mr-4 mb-4 lg:mb-0 lg:mr-0">
              <Image
                src={generatedImage}
                alt="Story Image"
                width={600}
                height={150}
                className="overflow-hidden"
              />
            </div>
            <p>{animatedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayStoryPage;
