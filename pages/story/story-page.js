import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import StoryForm from "./story-form";
import styles from "../index.module.css";

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
      // Display user-friendly error message
      console.error(error);
      alert("An error occurred during your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Creating Story</title>
        <link rel="icon" href="/docs/penguin.png" />
      </Head>

      <main className={styles.main}>
        <img src="/docs/penguin.png" className={styles.icon} />
        <h3>Short story</h3>
        {loading ? (
          <p>Loading...</p>
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
