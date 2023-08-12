import Link from "next/link";
import { Header } from "./header";
export const HomePage = () => (
  <div className="home_body">
    <div className="home_content">
      <h1>Dream Tales</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
        est laborum.
      </p>
      <Link href="/story/" passHref>
        <button>Create story</button>
      </Link>
    </div>
  </div>
);
