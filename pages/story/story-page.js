import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import StoryForm from "./story-form";
import styles from "../index.module.css";

const StoryPage = () => {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState(3);
  const [gender, setGender] = useState("");
  const [parent1Name, setParent1Name] = useState("");
  const [parent2Name, setParent2Name] = useState("");
  const [friendName, setFriendName] = useState("");
  const [favoriteToy, setFavoriteToy] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [storyStyle, setStoryStyle] = useState("");
  const [storyTopic, setStoryTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState(3);
  

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = {
      name: childName,
      age: age,
      gender: gender,
      parent1Name: parent1Name,
      parent2Name: parent2Name,
      friendName: friendName,
      favoriteToy: favoriteToy,
      location: location,
      storyStyle: storyStyle,
      storyTopic: storyTopic,
      language: language,
      time: time,
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
      setParent1Name("");
      setParent2Name("");
      setFriendName("");
      setFavoriteToy("");
      setLocation("");
      setStoryStyle("");
      setStoryTopic("");
      setLanguage("");

      router.push({
        pathname: "/story/display-story",
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
          parent1Name={parent1Name}
          setParent1Name={setParent1Name}
          parent2Name={parent2Name}
          setParent2Name={setParent2Name}
          friendName={friendName}
          setFriendName={setFriendName}
          favoriteToy={favoriteToy}
          setFavoriteToy={setFavoriteToy}
          location={location}
          setLocation={setLocation}
          loading={loading}
          storyStyle={storyStyle}
          setStoryStyle={setStoryStyle}
          storyTopic={storyTopic}
          setStoryTopic={setStoryTopic}
          language={language}
          setLanguage={setLanguage}
          time={time}
          setTime={setTime}
        />
      )}
      </main>
    </div>
  );
};

export default StoryPage;