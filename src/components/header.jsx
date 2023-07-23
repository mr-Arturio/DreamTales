import Link from 'next/link';

export const Header = () => (

<header>
<nav>
  <ul>
    <li>
      <Link href="/" passHref>
         Home
      </Link>
    </li>
    <li>
      <Link href="/favorites" passHref>
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
  </ul>
</nav>
</header>
);