import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/pages/logout";

export const Header = ({ cookies }) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className="border-b-1 relative z-20 w-full  bg-gradient-to-r from-blue-800 to-teal-700">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
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
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute  gap-4 pr-8 top-0 right-0 z-[-1] h-[28.5rem] w-full  justify-center items-end overflow-hidden  overflow-y-auto overscroll-contain px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:justify-end lg:pr-0 lg:pb-5 lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-1  lg:pt-5 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              {/* Conditionally render based on user login */}
              {cookies ? (
                <>
                  <li role="none" className="flex items-stretch">
                    <Link
                      href="/"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Home
                    </Link>
                  </li>
                  <li role="none" className="flex items-stretch">
                    <Link
                      href="/story/"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Create Story
                    </Link>
                  </li>
                  <li role="none" className="flex items-stretch">
                    <Link
                      href="/story/display-story"
                      passHref
                      className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-100 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    >
                      Your Stories
                    </Link>
                  </li>
                  <li role="none" className="flex items-stretch">
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
      </header>
      {/*<!-- End Basic Navbar--> */}
    </>
  );
};
