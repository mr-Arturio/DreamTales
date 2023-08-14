import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"

export default function ModalActionButtonsFav({ displayFavouriteStory, displayPhoto, displayTitle, itemId }) {
  const [isShowing, setIsShowing] = useState(false)
  const [isFavourite, setFavourite] = useState(true)

  const wrapperRef = useRef(null)

  //useTheme()

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    let html = document.querySelector("html")

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden"

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

        const modal = document.querySelector("#modal") // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements)

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

        document.addEventListener("keydown", function(e) {
          if (e.keyCode === 27) {
            setIsShowing(false)
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9

          if (!isTabPressed) {
            return
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus() // add focus for the last focusable element
              e.preventDefault()
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus() // add focus for the first focusable element
              e.preventDefault()
            }
          }
        })

        firstFocusableElement.focus()
      } else {
        html.style.overflowY = "visible"
      }
    }
  }, [isShowing])

  async function removeFavoritesSetShowing(id) {
    const data = {
      id
    }
    try {
      const response = await fetch('/api/remove-from-favourites', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setFavourite(false)
        setIsShowing(false)
        window.location.reload()
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating favorites' });
    }
  }

  async function deleteStory(id) {
    const data = {
      id
    }
    try {
      const response = await fetch('/api/delete-favourite-stories', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setFavourite(false)
        setIsShowing(false)
        window.location.reload()
      }
    } catch(error) {
      res.status(500).json({ error: 'Error updating favorites' })
    }
  }


  return (
    <>
      <button
        onClick={() => setIsShowing(true)}
        className="h-10 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>Open Story</span>
      </button>
      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(


          <div
            className="fixed top-0 bg-opacity-70 bg-blue-900 left-0 z-20 flex h-screen w-screen items-center justify-center backdrop-blur-lg"
            aria-labelledby="header-1a content-1a"
            aria-modal="true"
            tabindex="-1"
            role="dialog"
          >
            {/*    <!-- Modal --> */}
            <div
              className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
              ref={wrapperRef}
              id="modal"
              role="document"
            >
              {/*        <!-- Modal header --> */}

              <header id="header-1a" className="flex items-center gap-4">
                <h3 className="flex-1 text-xl font-medium text-slate-700">
                  {displayTitle}
                </h3>
                <button
                  onClick={() => setIsShowing(false)}
                  className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                  aria-label="close dialog"
                >
                  <span className="relative only:-mx-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      role="graphics-symbol"
                      aria-labelledby="title-79 desc-79"
                    >
                      <title id="title-79">Icon title</title>
                      <desc id="desc-79">
                        A more detailed description of the icon
                      </desc>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
              </header>
              {/*        <!-- Modal body --> */}
              <div id="content-1a" className="flex-1 overflow-auto">
                <figure>
                  <img
                    src={displayPhoto}
                    alt="card image"
                    className="aspect-video w-auto mx-12"
                  />
                </figure>
                <p>
                  {displayFavouriteStory}
                </p>
              </div>
              {/*        <!-- Modal actions --> */}
              <div className="flex justify-start gap-2">
                <button onClick={() => removeFavoritesSetShowing(itemId)} className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  <span>Remove From Favourites</span>
                </button>
                <button onClick={()=>deleteStory(itemId)} className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                  <span>Delete Story</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
        : null}
    </>
  )
}
