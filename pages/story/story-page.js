import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import StoryForm from "./story-form";
import styles from "../index.module.css";

const StoryPage = () => {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [parent1Name, setParent1Name] = useState("");
  const [parent2Name, setParent2Name] = useState("");
  const [friendName, setFriendName] = useState("");
  const [favoriteToy, setFavoriteToy] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: childName,
          age: age,
          gender: gender,
          parent1Name: parent1Name,
          parent2Name: parent2Name,
          friendName: friendName,
          favoriteToy: favoriteToy,
          location: location
        }),
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
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/docs/penguin.png" />
      </Head>

      <main className={styles.main}>
        <img src="/docs/penguin.png" className={styles.icon} />
        <h3>Short story</h3>
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
        />
        <div className={styles.result}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <textarea rows={50} value={result} readOnly />
          )}
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
