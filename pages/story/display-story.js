
import React from "react";
import { useEffect, useState } from "react";
import { verifyToken } from "../api/auth";
import { parse } from "cookie";
import { useRouter } from "next/router";


const DisplayStoryPage = () => {
  const [data, setData] = useState([]);
  const [isFavourite, setFavourite] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const router = useRouter()
  
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
    
      async function getData() {
        try {
          const response = await fetch('/api/retrieveStory');
          const story= await response.json();
          const storiesWithFavourite = story.map((item) => ({
            ...item,
            isFavourite: false,
          }));
          setData(storiesWithFavourite)
          setIsLoaded(true)
        
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      checkLoginStatus()
      getData();
    }, [router])
  
    const truncateText = (text, maxLength) => {
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
    };
    
    async function toggleFavorite(id) {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, isFavourite: !item.isFavourite };
        }
        return item;
      });
      setData(updatedData);
  
      const response = await fetch("/api/favorites-save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        console.error("Error updating favorites");
      }
    }

  // async function Favorites(id) {
  //   const data = {
  //     id
  //   }
  
  //   try {
  //     const response = await fetch('/api/favorites-save', {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data)
  //     });
  //     if (response.ok) {
  //       setFavourite()
  //     }
  //   } catch (error) {
  //     console.log('error in setting favourites')
  //     console.error(error)
  //     //res.status(500).json({ error: 'Error updating favorites' });
  //   }
  // }
  return (
    <div className='grid grid-cols-3 gap-4'>
      { isLoaded ? (
        data.map((item) => (
          <div key={item.id}>
            {/*<!-- Component: Horizontal card--> */}
            <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row">
              {/*  <!-- Image --> */}
              {/*  <!-- Body--> */}
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
                    alt="card image"
                    className="m-auto"
                  />
                </figure>
                <p>
                  {truncateText(item.story, 150)}</p>
                <button className={`whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide ${isFavourite ? 'bg-emerald-500 text-white' : 'text-emerald-500'
                  } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                  onClick={()=> toggleFavorite(item.id)}>
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
            </div>

            {/*<!-- End Horizontal card--> */}
          </div>
        ))) : (<>
          {/*<!-- Component: Horizontal card--> */}
          <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row">
            {/*  <!-- Image --> */}
            {/*  <!-- Body--> */}
            <div className="flex-1 p-6 sm:mx-6 sm:px-0">
              <header className="flex gap-4 mb-4 h-auto">
                <div>
                  <h3 className="text-xl font-medium text-slate-700">
                    {data.title}
                  </h3>
                  <p className="text-sm text-slate-400"> {data.created_at}</p>
                </div>
              </header>
              <figure className="">
                <img
                  src={data.photo}
                  alt="card image"
                  className="m-auto"
                />
              </figure>
              <p>
                {truncateText(data.story, 150)}</p>
              <button className={`whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide ${isFavourite ? 'bg-emerald-500 text-white' : 'text-emerald-500'
                } transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent`}
                onClick={()=> toggleFavorite()}>
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
          </div>

          {/*<!-- End Horizontal card--> */}
        </>


      )}

    </div>
  );

};

export default DisplayStoryPage;
