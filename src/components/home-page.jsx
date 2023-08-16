import Link from "next/link";
import { Header } from "./header";
export const HomePage = () => (
  <div className="home_body">
    <div className="home_content">
      <h1>Dream Tales</h1>
      <p>
        Are you tired of reading the same old bedtime stories night after night?
        Do you struggle to come up with new, creative tales for your little one?
        Do you want your child to be the star of their own adventure? Look no
        further - we've got you covered! <br></br>
        Welcome to the DreamTales, the ultimate personalized kids' story app. We
        understand that every child is unique and deserves stories as special as
        they are. With DreamTales, you'll embark on a journey of imagination,
        discovery, and learning, all tailored to your child's interests and
        preferences.
      </p>
      <Link href="/story/" passHref>
        <button>Create story</button>
      </Link>
    </div>
  </div>
);
