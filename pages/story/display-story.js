import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalActionButtons from "@/src/components/Modal";

const DisplayStoryPage = () => {
  const [data, setData] = useState([]);
  const [isFavourite, setFavourite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function checkLoginStatus(req, res) {
      try {
        const response = await fetch("/api/check-login-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data.isLoggedIn) {
          // User is not logged in, redirect to the login page
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }

    async function getData() {
      try {
        const response = await fetch("/api/retrieveStory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const story = await response.json();
        if (response.ok) {
          setData(story);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    checkLoginStatus();
    getData();
    console.log("SET DATA ----->", data);
  }, [router]);

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  async function toggleFavorite(id) {
    try {
      const response = await fetch("/api/favorites-save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Update the favorite status in the local state

        setFavourite();
        setIsLoaded(true);
      } else {
        console.error("Error updating favorites");
      }
    } catch (error) {
      console.error("Error in setting favorites:", error);
    }
  }

  return (
    <>
    <Head>
    <title>Your Stories</title>
    <link rel="icon" href="/docs/design/logo/cloudBlue.svg" />
  </Head>
    <div
      className="grid grid-cols-4 gap-4 bg-cover bg-center bg-no-repeat min-h-screen  justify-start items-center"
      style={{
        backgroundImage: 'url("/docs/design/Backgrounds/collage4.svg")',
      }}
    >
      {isLoaded ? (
        data.map((item) => (
          <div key={item.id}>
            <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 w-auto h-auto m-12">
              <div className="flex-1 p-6 sm:mx-6 sm:px-0">
                <header className="flex gap-4 mb-4 h-auto">
                  <div>
                    <h3 className="text-xl font-medium text-slate-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400"> {item.created_at}</p>
                  </div>
                </header>
                <figure className="">
                  <img
                    src={item.photo}
                    alt="Story image"
                    className="m-auto mb-5"
                  />
                </figure>
                <p>{truncateText(item.story, 150)}</p>
                <div className="flex justify-between">
                  <button
                    className={`whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide ${
                      isFavourite
                        ? "bg-emerald-500 text-white"
                        : "text-emerald-500"
                    } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                    onClick={() => toggleFavorite(item.id)}
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
                  <ModalActionButtons
                    className="inline-flex items-center h-10 gap-2 text-sm font-medium tracking-wide"
                    displayFavouriteStory={item.story}
                    displayPhoto={item.photo}
                    displayTitle={item.title}
                    itemId={item.id}
                  ></ModalActionButtons>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 w-auto h-auto m-12">
            <div className="flex-1 p-6 sm:mx-6 sm:px-0">
              <header className="flex gap-4 mb-4 h-auto">
                <div>
                  <h3 className="text-xl font-medium text-slate-700">
                    {data.title}
                  </h3>
                  <p className="text-sm text-slate-400"> {data.created_at}</p>
                </div>
              </header>
              <figure>
                <img
                  src={data.photo}
                  alt="card image"
                  className="m-auto mb-5"
                />
              </figure>
              <p>{truncateText(data.story, 150)}</p>
              <div className="flex justify-between">
                <button
                  className={`whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide ${
                    isFavourite
                      ? "bg-emerald-500 text-white"
                      : "text-emerald-500"
                  } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                  onClick={() => toggleFavorite(id)}
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
                <ModalActionButtons className="inline-flex items-center h-10 gap-2 text-sm font-medium tracking-wide">
                  {" "}
                  displayFavouriteStory={data.story} displayPhoto ={data.photo}{" "}
                  displayTitle={data.title} itemId={data.id}
                </ModalActionButtons>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default DisplayStoryPage;
