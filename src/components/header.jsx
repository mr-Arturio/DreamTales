
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
    <header className="w-full h-96 bg-gradient-to-r from-green-100 to-transparent p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <Image alt="logo" src={"/docs/images(1).jpg"} width={160} height={60} />
          {/* ... */}
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

