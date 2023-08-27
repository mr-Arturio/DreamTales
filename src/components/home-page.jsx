import Link from "next/link";

export const HomePage = () => (
  <div className="home_body">
    <div className="home_content">
      <h1>Dream Tales</h1>
      <p>
        Are repetitive bedtime stories getting old? Struggling with creativity
        for your little one? Do you want your child to be the star of their own
        adventure? Look no further - we&apos;ve got you covered! <br></br>
        Introducing DreamTales, the personalized kids&apos; story app. Each
        child is unique, and their stories should be too. With DreamTales, enjoy
        customized journeys of imagination, discovery, and learning, all aligned
        with your child&apos;s interests.
      </p>
      <Link href="/story/" passHref>
        <button>Create story</button>
      </Link>
    </div>
  </div>
);
