import Link from 'next/link';
import Image from 'next/image';

export const Header = () => (

  <header className="w-full h-96 bg-gradient-to-r from-green-100 to-transparent p-6">
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <Image alt="logo" src={'/docs/images(1).jpg'} width={160} height={60} />
        <nav>
          <ul className="flex gap-4">
            <li className="font-semibold text-lg">
              <Link href="/" passHref>
                Home
              </Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/story/story-page" passHref>
                Create Story
              </Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/story/favorites-page" passHref>
                Favorites
              </Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/story/saved-stories" passHref>
                Your Stories
              </Link>
            </li>
            <li className="font-semibold text-lg">
              <Link href="/sign-up" passHref>
                Sign Up
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
          </ul>
        </nav>
      </div>
      <p className="w-1/2 text-4xl uppercase">Personalized kids' bedtime story app</p>
    </div>
  </header>
);

