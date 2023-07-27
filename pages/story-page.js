import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const StoryPage = () => {
  const [nameInput, setNameInput] = useState("");
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
        body: JSON.stringify({ name: nameInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setNameInput("");
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
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input type="submit" value="Generate story" />
        </form>
        <div className={styles.result}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <textarea
              rows={10} // Adjust the number of rows as needed
              value={result}
              readOnly
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
