import LogoutButton from "@/pages/logout";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Header = ({ cookies }) => {
  // const [cookies, setCookie] = useState(null)

  return (
    <header className="w-full h-25 bg-gradient-to-r from-blue-800 to-teal-700">
      <div className="w-full max-w-8xl flex-col ">
        <div className="flex justify-between items-center">
          <Image
            alt="logo"
            src={"/docs/design/logo/cloudBlueText.svg"}
            width={100}
            height={85}
            style={{
              transform: "scale(2.3)",
              transformOrigin: "center",
              margin: "10px 0 0 30px ",
            }}
          />
          <nav>
            <ul className="flex gap-4 pr-8">
              {cookies ? ( // If user is logged in
                <>
                  <li>
                    <Link
                      href="/"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/story/"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Create Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/story/display-story"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Your Stories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/story/favorites-page"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Favorites
                    </Link>
                  </li>
                  <li>
                    {/* Render the LogoutButton directly */}
                    <LogoutButton />
                  </li>
                </>
              ) : (
                // If user is not logged in
                <>
                  <li>
                    <Link
                      href="/"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
