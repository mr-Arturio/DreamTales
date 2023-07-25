import Link from 'next/link';
import Image from 'next/image';

export const Header = () => (

<header>
  <div>
  <div className="topNav">
  <Image alt="logo" src={'/docs/images(1).jpg'} width={160} height={60} />
<nav>
  <ul>
    <li>
      <Link href="/" passHref>
         Home
      </Link>
    </li>
    <li>
      <Link href="/favorites-page" passHref>
        Favorites
      </Link>
    </li>
    <li>
      <Link href="/about-us" passHref>
        About us
      </Link>
    </li>
    <li>
      <Link href="/sign-up" passHref>
        Sign Up
      </Link>
    </li>
    <li>
      <Link href="/login" passHref>
        Login
      </Link>
    </li>
  </ul>
</nav>
</div>
<p className="title"> Personalized kids' bedtime story app </p>
</div>
</header>
);