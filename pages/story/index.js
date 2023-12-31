import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StoryForm from "./story-form";
import LoadingScreen from "@/src/components/loading-screen";
import "tailwindcss/tailwind.css";

const StoryPage = () => {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState(3);
  const [gender, setGender] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [storyStyle, setStoryStyle] = useState("");
  const [storyTopic, setStoryTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState(3);
  const [secondaryHero, setSecondaryHero] = useState("");
  const [secondaryHeroName, setSecondaryHeroName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch("/api/check-login-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data.isLoggedIn) {
          // User is not logged in, redirect to the login page
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }

    checkLoginStatus();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = {
      name: childName,
      age: age,
      gender: gender,
      storyStyle: storyStyle,
      storyTopic: storyTopic,
      language: language,
      time: time,
      secondaryHero: secondaryHero,
      secondaryHeroName: secondaryHeroName,
    };
    console.log("formData", formData);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setChildName("");
      setAge("");
      setGender("");
      setStoryStyle("");
      setStoryTopic("");
      setLanguage("");

      router.push({
        pathname: "/story/display-last-story",
        query: { story: JSON.stringify(data.result) },
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred during your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-start items-center"
      style={{
        backgroundImage:
          'url("/docs/design/Backgrounds/symbol-scatter-haikei(7).svg")',
      }}
    >
      <Head>
        <title>Creating Story</title>
        <link rel="icon" href="/docs/design/logo/cloudBlue.svg" />
      </Head>

      <main className="flex flex-col items-center">
        <Image
          src="/docs/design/LetsCraft4.svg"
          alt="cute ghost image"
          width={200}
          height={85}
        />
        {loading ? (
          <LoadingScreen />
        ) : (
          <StoryForm
            onSubmit={onSubmit}
            childName={childName}
            setChildName={setChildName}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            loading={loading}
            storyStyle={storyStyle}
            setStoryStyle={setStoryStyle}
            storyTopic={storyTopic}
            setStoryTopic={setStoryTopic}
            language={language}
            setLanguage={setLanguage}
            time={time}
            setTime={setTime}
            secondaryHero={secondaryHero}
            setSecondaryHero={setSecondaryHero}
            secondaryHeroName={secondaryHeroName}
            setSecondaryHeroName={setSecondaryHeroName}
          />
        )}
      </main>
    </div>
  );
};

export default StoryPage;
