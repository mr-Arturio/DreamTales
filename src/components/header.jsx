
import LogoutButton from "@/pages/logout";
import Link from "next/link";
import Image from "next/image";
import{ useEffect, useState } from 'react';

export const Header = () => {
  
const [cookies, setCookie] = useState(null)

  useEffect(() => {
    
    setCookie(localStorage.getItem('UserCookie'))
  }, [])

  return (
    <header className="w-full h-25 bg-gradient-to-r from-blue-800 to-teal-700">
      <div className="w-full max-w-8xl flex-col ">
        <div className="flex justify-between items-center">
        <Image
          alt="logo"
          src={"/docs/design/logo/cloud.svg"}
          width={100} /* Original width */
          height={85} /* Original height */
          style={{
            transform: 'scale(2.3)', /* Increase the scale as needed */
            transformOrigin: 'center', /* Set the transform origin to the center */
            margin: '10px 0 0 30px '
          }} />
          <nav>
            <ul className="flex gap-4">
              {/* Other links */}
              {cookies ? ( // If user is logged in
                <>
                  <li className="font-semibold text-lg">
                    <Link href="/" passHref>
                      Home
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/story/" passHref>
                      Create Story
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/story/saved-stories" passHref>
                      Your Stories
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/story/display-story" passHref>
                      Display Story
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/story/favorites-page" passHref>
                      Favorites
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    {/* Render the LogoutButton directly */}
                    <LogoutButton />
                  </li>
                </>
              ) : ( // If user is not logged in
                <>
                  <li className="font-semibold text-lg">
                    <Link href="/" passHref>
                      Home
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/login" passHref>
                      Login
                    </Link>
                  </li>
                  <li className="font-semibold text-lg">
                    <Link href="/register" passHref>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* ... */}
        </div>
      </div>
    </header>
  )
};

