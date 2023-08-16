import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import ModalActionButtonsFav from "@/src/components/Modal-Favourites";

const Header = () => {
  const [displayFavouriteStory, setdisplayFavouriteStory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavourite, setFavourite] = useState(true);

  const router = useRouter();

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
        router.push("/login"); // Replace with your login page URL
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }
  async function getFavouriteStory() {
    try {
      const response = await fetch("/api/display-favourite-save", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("DATA----->", data);
        setdisplayFavouriteStory(data);

        setIsLoaded(true);
      }
    } catch (error) {
      console.error("error fetching data", error);
    }
  }

  useEffect(() => {
    checkLoginStatus();
    getFavouriteStory();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  async function removeFavorites(id) {
    const data = {
      id,
    };
    try {
      const response = await fetch("/api/remove-from-favourites", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setFavourite(false);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating favorites" });
    }
  }

  return (
    <div
      key={1}
      className="grid grid-cols-4 gap-4 bg-cover bg-center bg-no-repeat min-h-screen  justify-start items-center"
      style={{
        backgroundImage: 'url("/docs/design/Backgrounds/dot3.svg")',
      }}
    >
      {isLoaded ? (
        displayFavouriteStory.map((item) => (
          <>
            {/*<!-- Component: Horizontal card--> */}
            <div
              key={item.id}
              className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 w-auto h-auto m-12"
            >
              {/*  <!-- Image --> */}
              {/*  <!-- Body--> */}
              <div className="flex-1 p-6 sm:mx-6 sm:px-0">
                <header className="flex gap-4 mb-4 h-auto">
                  <div>
                    <h3 className="text-xl font-medium text-slate-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400">{item.created_at}</p>
                  </div>
                </header>
                <figure className="">
                  <img
                    src={item.photo}
                    alt="card image"
                    className="m-auto mb-5"
                  />
                </figure>
                <p>{truncateText(item.story, 150)}</p>
                <div className="flex justify-between">
                  <button
                    className={` whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide ${
                      isFavourite
                        ? "bg-emerald-500 text-white"
                        : "text-emerald-500"
                    } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                    onClick={() => removeFavorites(item.id)}
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
                        <desc id="desc-81">
                          Click to remove from favorites page
                        </desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </span>
                  </button>

                  <ModalActionButtonsFav
                    className="inline-flex items-center h-10 gap-2 text-sm font-medium tracking-wide"
                    displayFavouriteStory={item.story}
                    displayPhoto={item.photo}
                    displayTitle={item.title}
                    removeFav={removeFavorites}
                    itemId={item.id}
                  ></ModalActionButtonsFav>
                </div>
              </div>
            </div>

            {/*<!-- End Horizontal card--> */}
          </>
        ))
      ) : (
        <>
          {/*<!-- Component: Basic blog card --> */}
          <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 w-auto h-auto m-12">
            {/*  <!-- Image --> */}
            <figure>
              <img
                src={displayFavouriteStory.photo}
                alt="card image"
                className="aspect-video w-full"
              />
            </figure>
            {/*  <!-- Body--> */}
            <div className="p-6">
              <header className="mb-4">
                <h3 className="text-xl font-medium text-slate-700">
                  {displayFavouriteStory.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {" "}
                  {displayFavouriteStory.created_at}
                </p>
              </header>
              <p>{truncateText(displayFavouriteStory.story, 150)}</p>
              <div className="flex justify-between">
                <button
                  className={`whitespace-nowrap rounded inline-flex items-center px-10 h-10 gap-2 text-sm font-medium tracking-wide${
                    isFavourite
                      ? "bg-emerald-500 text-white"
                      : "text-emerald-500"
                  } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                  onClick={() => removeFavorites()}
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
                      <desc id="desc-81">
                        Click to remove from favorites page
                      </desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                </button>
                <ModalActionButtonsFav
                  className="inline-flex items-center h-10 gap-2 text-sm font-medium tracking-wide"
                  displayFavouriteStory={displayFavouriteStory.story}
                  displayPhoto={displayFavouriteStory.photo}
                  displayTitle={displayFavouriteStory.title}
                ></ModalActionButtonsFav>
              </div>
            </div>
          </div>
          {/*<!-- End Basic blog card --> */}
        </>
      )}
    </div>
  );
};

export default Header;
